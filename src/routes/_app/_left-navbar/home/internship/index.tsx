import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { CheckCircle2, ChevronLeft, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import useSession from '~/hooks/auth/useSession';
import { isInRoles } from '~/lib/roles';
import CountdownTimer from './-components/CountdownTimer';
import DivisionDescriptions from './-components/DivisionDescriptions';
import DivisionQuestions from './-components/DivisionQuestions';
import DivisionSelector from './-components/DivisionSelector';
import GeneralInfoSection from './-components/GeneralInfoSection';
import { ELIGIBLE_SPARTA_ANGKATAN, MAX_DIVISION_CHOICES } from './-constants';
import {
  useInternshipDepartments,
  useMyInternshipSubmission,
} from './-useInternshipData';
import useInternshipForm from './-useInternshipForm';

export const Route = createFileRoute('/_app/_left-navbar/home/internship/')({
  component: InternshipPage,
});

const STEPS = [
  { key: 'general', label: 'Info Umum' },
  { key: 'description', label: 'Penjelasan Divisi' },
  { key: 'division', label: 'Pilih Divisi' },
  { key: 'questions', label: 'Pertanyaan Divisi' },
] as const;

function InternshipPage() {
  const router = useRouter();
  const user = useSession();
  const isEligible = ELIGIBLE_SPARTA_ANGKATAN.includes(user.angkatan);

  const { data: departments, isLoading: isLoadingDepartments } =
    useInternshipDepartments();
  const { data: submission, isLoading: isLoadingSubmission } =
    useMyInternshipSubmission();

  const { form, saveDraft, submitFinal } = useInternshipForm(submission);
  const [step, setStep] = useState<number>(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const isLocked = !!submission?.isLocked;
  const isLoading = isLoadingDepartments || isLoadingSubmission;
  const isAdmin = isInRoles(user, ['peoplemanage']);

  const handleSaveDraft = form.handleSubmit(
    (values) => saveDraft.mutate(values),
    () => {},
  );

  const handleSubmitFinal = form.handleSubmit((values) => {
    submitFinal.mutate(values, {
      onSuccess: () => setConfirmOpen(false),
    });
  });

  const deptList = departments?.departments ?? [];
  const findDivision = (id: string) =>
    deptList.flatMap((d) => d.divisions ?? []).find((d) => d.id === id);

  const watchedKelas = useWatch({ control: form.control, name: 'kelas' });
  const watchedIdLine = useWatch({ control: form.control, name: 'idLine' });
  const watchedChoices = useWatch({ control: form.control, name: 'choices' });

  const isGeneralComplete = !!watchedKelas?.trim() && !!watchedIdLine?.trim();
  const isDivisionComplete =
    (watchedChoices?.length ?? 0) === MAX_DIVISION_CHOICES;
  const isQuestionsComplete = (watchedChoices ?? []).every((choice) => {
    const division = findDivision(choice.divisionId);
    return (division?.questions ?? []).every(
      (q, qIdx) => !q.required || !!choice.answers[qIdx]?.answer?.trim(),
    );
  });

  const validateSubmission = async () => {
    const isFormValid = await form.trigger();

    const values = form.getValues();
    let missingRequired = false;
    values.choices.forEach((choice, choiceIdx) => {
      const division = findDivision(choice.divisionId);
      (division?.questions ?? []).forEach((q, qIdx) => {
        if (q.required) {
          const answer = choice.answers[qIdx]?.answer?.trim();
          if (!answer) {
            form.setError(`choices.${choiceIdx}.answers.${qIdx}.answer`, {
              type: 'required',
              message: 'Pertanyaan ini wajib diisi',
            });
            missingRequired = true;
          }
        }
      });
    });

    if (!isFormValid || missingRequired) {
      const errors = form.formState.errors;
      const problemSteps: number[] = [];
      if (errors.kelas || errors.idLine || errors.kesibukan)
        problemSteps.push(0);
      if (errors.choices) problemSteps.push(2);
      if (missingRequired) problemSteps.push(3);
      if (problemSteps.length > 0) setStep(Math.min(...problemSteps));
      toast.error(
        'Masih ada data yang wajib diisi. Periksa kembali formulir kamu.',
      );
      return false;
    }
    return true;
  };

  const handleOpenConfirm = async () => {
    const ok = await validateSubmission();
    if (ok) setConfirmOpen(true);
  };

  if (!isEligible) {
    return (
      <div className="flex size-full h-screen flex-col overflow-hidden bg-green-50">
        <div className="relative mx-auto flex max-h-screen w-full flex-col items-center lg:max-w-screen-lg lg:px-8">
          <Button
            variant="link"
            className="my-6 hidden w-full justify-start gap-8 p-0 text-3xl font-medium lg:flex"
            onClick={() => router.history.back()}
          >
            <ChevronLeft className="size-8" />
            <span>Back</span>
          </Button>
          <main className="flex w-full flex-col items-center justify-center gap-4 bg-[url(/img/login/login-bg.jpg)] bg-no-repeat px-8 py-24 md:bg-[url(/img/login/login-bg-desktop.jpg)] lg:max-w-screen-lg lg:rounded-t-2xl lg:px-[82px]">
            <h1 className="text-center text-3xl font-bold text-white">
              SPARTA HMIF
            </h1>
            <p className="text-center text-white">
              Maaf, pendataan pilihan magang SPARTA saat ini hanya tersedia
              untuk mahasiswa angkatan tertentu.
            </p>
            {isAdmin && (
              <Button asChild variant="outlined" size="sm">
                <Link to="/home/internship/admin">Buka Dashboard Admin</Link>
              </Button>
            )}
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex size-full h-screen flex-col overflow-hidden bg-green-50">
      <div className="relative mx-auto flex max-h-screen w-full flex-col items-center lg:max-w-screen-lg lg:px-8">
        <Button
          variant="link"
          className="my-6 hidden w-full justify-start gap-8 p-0 text-3xl font-medium lg:flex"
          onClick={() => router.history.back()}
        >
          <ChevronLeft className="size-8" />
          <span>Back</span>
        </Button>

        <main className="flex max-h-screen w-full flex-col items-center gap-4 overflow-auto bg-[url(/img/login/login-bg.jpg)] bg-no-repeat px-6 pb-28 pt-[50px] md:bg-[url(/img/login/login-bg-desktop.jpg)] lg:mt-8 lg:max-w-screen-lg lg:rounded-t-2xl lg:px-[82px] lg:pb-6 lg:pt-8">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-left text-3xl font-bold text-white lg:text-5xl">
              Pilihan Magang SPARTA
            </h1>
            {isAdmin && (
              <Button asChild variant="outlined" size="sm">
                <Link to="/home/internship/admin">Dashboard Admin</Link>
              </Button>
            )}
          </div>

          {isLocked && (
            <p className="w-full rounded-lg bg-yellow-100 p-3 text-sm text-neutral-black">
              Pilihan magang kamu sudah dikirim dan terkunci. Kamu tidak bisa
              mengubah jawaban lagi.
            </p>
          )}

          {!isLocked && <CountdownTimer />}

          {isLoading || !departments ? (
            <p className="text-white">Memuat data...</p>
          ) : (
            <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-4 lg:p-6">
              <div className="flex w-full items-center gap-2">
                {STEPS.map((s, idx) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStep(idx)}
                    className={`flex-1 rounded-full p-2 text-center text-xs font-semibold ${
                      idx === step
                        ? 'bg-green-950 text-white'
                        : 'bg-gray-100 text-neutral-darker'
                    }`}
                  >
                    {idx + 1}. {s.label}
                  </button>
                ))}
              </div>

              {step === 0 && (
                <GeneralInfoSection form={form} disabled={isLocked} />
              )}
              {step === 1 && (
                <DivisionDescriptions
                  departments={departments.departments ?? []}
                />
              )}
              {step === 2 && (
                <DivisionSelector
                  form={form}
                  departments={departments.departments ?? []}
                  disabled={isLocked}
                />
              )}
              {step === 3 && (
                <DivisionQuestions
                  form={form}
                  departments={departments.departments ?? []}
                  disabled={isLocked}
                />
              )}

              <div className="flex flex-col items-stretch gap-2 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <Button
                  type="button"
                  variant="outlined"
                  size="sm"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="w-full sm:w-auto"
                >
                  Sebelumnya
                </Button>

                {step < STEPS.length - 1 ? (
                  <Button
                    type="button"
                    size="sm"
                    onClick={() =>
                      setStep((s) => Math.min(STEPS.length - 1, s + 1))
                    }
                    className="w-full sm:w-auto"
                  >
                    Selanjutnya
                  </Button>
                ) : (
                  !isLocked && (
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Button
                        type="button"
                        variant="outlined"
                        size="sm"
                        disabled={saveDraft.isPending}
                        onClick={handleSaveDraft}
                        className="w-full sm:w-auto"
                      >
                        Simpan Draft
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        disabled={submitFinal.isPending}
                        onClick={handleOpenConfirm}
                        className="w-full sm:w-auto"
                      >
                        Kirim Pilihan
                      </Button>
                    </div>
                  )
                )}
              </div>

              {!isLocked && (
                <div className="flex flex-col gap-1.5 rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm">
                  <p className="font-semibold text-neutral-black">
                    Status Kelengkapan
                  </p>
                  <div className="flex items-center gap-2">
                    {isGeneralComplete ? (
                      <CheckCircle2 className="size-4 shrink-0 text-green-600" />
                    ) : (
                      <XCircle className="size-4 shrink-0 text-red-500" />
                    )}
                    <span
                      className={
                        isGeneralComplete
                          ? 'text-neutral-darker'
                          : 'text-red-600'
                      }
                    >
                      Info Umum (Kelas & ID Line)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isDivisionComplete ? (
                      <CheckCircle2 className="size-4 shrink-0 text-green-600" />
                    ) : (
                      <XCircle className="size-4 shrink-0 text-red-500" />
                    )}
                    <span
                      className={
                        isDivisionComplete
                          ? 'text-neutral-darker'
                          : 'text-red-600'
                      }
                    >
                      Pilihan Divisi ({watchedChoices?.length ?? 0}/
                      {MAX_DIVISION_CHOICES})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isQuestionsComplete ? (
                      <CheckCircle2 className="size-4 shrink-0 text-green-600" />
                    ) : (
                      <XCircle className="size-4 shrink-0 text-red-500" />
                    )}
                    <span
                      className={
                        isQuestionsComplete
                          ? 'text-neutral-darker'
                          : 'text-red-600'
                      }
                    >
                      Pertanyaan Wajib Tiap Divisi
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kirim Pilihan Magang?</DialogTitle>
            <DialogDescription>
              Setelah dikirim, pilihan magangmu akan terkunci dan tidak bisa
              diubah lagi. Pastikan semua data sudah benar.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outlined"
              size="sm"
              onClick={() => setConfirmOpen(false)}
            >
              Batal
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={submitFinal.isPending}
              onClick={handleSubmitFinal}
            >
              Ya, Kirim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
