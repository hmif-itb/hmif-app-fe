import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ChevronLeft, PartyPopper } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useBungkus } from 'bungkus';
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
import CountdownTimer from './-components/CountdownTimer';
import ProgressBar from './-components/ProgressBar';
import QuestionField from './-components/QuestionField';
import {
  AnswerValue,
  AnswersRecord,
  countAnsweredQuestions,
  findFirstIncompleteSection,
  isQuestionAnswered,
  isQuestionRequired,
  isQuestionVisible,
  isSectionComplete,
} from './-constants';
import {
  useFormDetail,
  useMyFormResponse,
  useSubmitFormResponse,
} from './-useFormData';

export const Route = createFileRoute('/_app/_left-navbar/home/form/$formId')({
  component: FormFillPage,
});

function FormFillPage() {
  const router = useRouter();
  const { formId } = Route.useParams();
  const user = useSession();

  const { data: form, isLoading: isLoadingForm } = useFormDetail(formId);
  const { data: myResponse, isLoading: isLoadingResponse } =
    useMyFormResponse(formId);
  const submitFormResponse = useSubmitFormResponse(formId);

  const storageKey = `hmif-form-${formId}-${user.id}`;
  const {
    values: savedAnswers,
    status: bungkusStatus,
    bungkus: persistField,
    buangBungkus,
  } = useBungkus<AnswersRecord>(storageKey, { kadaluarsa: 24 * 14 });

  const [answers, setAnswers] = useState<AnswersRecord>({});
  const [sectionIndex, setSectionIndex] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [opened, setOpened] = useState(false);

  const restoredRef = useRef(false);
  useEffect(() => {
    if (
      bungkusStatus === 'siap' &&
      !restoredRef.current &&
      Object.keys(savedAnswers).length > 0
    ) {
      restoredRef.current = true;
      setAnswers(savedAnswers);
    }
  }, [bungkusStatus, savedAnswers]);

  const opensAt = form ? new Date(form.opensAt) : null;
  const sections = form?.sections ?? null;
  const hasOpened =
    opened || (opensAt ? opensAt.getTime() <= Date.now() : false) || !!sections;

  const handleAnswerChange = (questionId: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    persistField(questionId, value);
    setFieldErrors((prev) => {
      if (!(questionId in prev)) return prev;
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const validateSection = (index: number): boolean => {
    if (!sections) return false;
    const section = sections[index];
    const errors: Record<string, string> = {};
    for (const question of section.questions) {
      if (
        isQuestionRequired(question, answers) &&
        !isQuestionAnswered(question, answers)
      ) {
        errors[question.id] = 'Pertanyaan ini wajib diisi';
      }
    }
    setFieldErrors((prev) => ({ ...prev, ...errors }));
    if (Object.keys(errors).length > 0) {
      toast.error('Masih ada pertanyaan wajib yang belum diisi.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateSection(sectionIndex)) return;
    if (sections && sectionIndex < sections.length - 1) {
      setSectionIndex((s) => s + 1);
    }
  };

  const handleOpenConfirm = () => {
    if (!sections) return;
    const missingSectionIdx = findFirstIncompleteSection(sections, answers);
    if (!isSectionComplete(sections[missingSectionIdx], answers)) {
      setSectionIndex(missingSectionIdx);
      validateSection(missingSectionIdx);
      return;
    }
    setConfirmOpen(true);
  };

  const handleSubmit = () => {
    submitFormResponse.mutate(answers, {
      onSuccess: () => {
        buangBungkus();
        setConfirmOpen(false);
        toast.success('Form berhasil dikirim!');
      },
      onError: () => {
        toast.error('Gagal mengirim form. Coba lagi.');
      },
    });
  };

  const isEligible = form
    ? form.eligibleAngkatan.includes(user.angkatan)
    : true;
  const isLoading = isLoadingForm || isLoadingResponse;

  return (
    <div className="flex size-full h-screen flex-col overflow-hidden bg-green-50">
      <div className="relative mx-auto flex max-h-screen w-full flex-col items-center overflow-auto lg:max-w-screen-lg lg:px-8">
        <Button
          variant="link"
          className="my-6 w-full justify-start gap-8 p-0 text-2xl font-medium lg:text-3xl"
          onClick={() => router.history.back()}
        >
          <ChevronLeft className="size-8" />
          <span>Back</span>
        </Button>

        <div className="flex w-full flex-col gap-4 px-4 pb-24 lg:px-0">
          {isLoading && (
            <p className="text-sm text-neutral-darker">Memuat data...</p>
          )}

          {!isLoading && form && !isEligible && (
            <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-white p-8 text-center">
              <p className="break-words font-semibold">{form.title}</p>
              <p className="break-words text-sm text-neutral-darker">
                Maaf, form ini tidak tersedia untuk kamu.
              </p>
            </div>
          )}

          {!isLoading && form && isEligible && (
            <>
              <h1 className="break-words text-2xl font-bold lg:text-3xl">
                {form.title}
              </h1>
              {form.description && (
                <p className="break-words text-sm text-neutral-darker">
                  {form.description}
                </p>
              )}

              {!hasOpened && opensAt && (
                <CountdownTimer
                  target={opensAt}
                  onDone={() => setOpened(true)}
                />
              )}

              {hasOpened && myResponse && (
                <div className="flex w-full flex-col items-center gap-3 rounded-xl bg-white p-8 text-center">
                  <PartyPopper className="size-8 text-green-800" />
                  <p className="font-semibold">Terima kasih sudah mengisi!</p>
                  <p className="break-words text-sm text-neutral-darker">
                    Jawaban kamu untuk form ini sudah tersimpan dan tidak dapat
                    diubah lagi.
                  </p>
                </div>
              )}

              {hasOpened && !myResponse && !sections && (
                <p className="text-sm text-neutral-darker">
                  Memuat pertanyaan...
                </p>
              )}

              {hasOpened && !myResponse && sections && (
                <div className="flex w-full flex-col gap-6 rounded-xl bg-white p-4 lg:p-6">
                  <ProgressBar
                    sections={sections}
                    currentIndex={sectionIndex}
                    onSelect={setSectionIndex}
                    completedIndexes={
                      new Set(
                        sections
                          .map((s, idx) =>
                            isSectionComplete(s, answers) ? idx : -1,
                          )
                          .filter((idx) => idx !== -1),
                      )
                    }
                  />

                  <div className="flex flex-col gap-6">
                    <h2 className="break-words text-lg font-bold">
                      {sections[sectionIndex].title}
                    </h2>
                    {sections[sectionIndex].questions
                      .filter((q) => isQuestionVisible(q, answers))
                      .map((question) => (
                        <QuestionField
                          key={question.id}
                          question={question}
                          value={answers[question.id]}
                          onChange={(value) =>
                            handleAnswerChange(question.id, value)
                          }
                          error={fieldErrors[question.id]}
                          required={isQuestionRequired(question, answers)}
                        />
                      ))}
                  </div>

                  <div className="flex flex-col items-stretch gap-2 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <Button
                      type="button"
                      variant="outlined"
                      size="sm"
                      disabled={sectionIndex === 0}
                      onClick={() => setSectionIndex((s) => Math.max(0, s - 1))}
                      className="w-full sm:w-auto"
                    >
                      Sebelumnya
                    </Button>

                    {sectionIndex < sections.length - 1 ? (
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleNext}
                        className="w-full sm:w-auto"
                      >
                        Selanjutnya
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        disabled={submitFormResponse.isPending}
                        onClick={handleOpenConfirm}
                        className="w-full sm:w-auto"
                      >
                        Kirim Jawaban
                      </Button>
                    )}
                  </div>

                  <p className="text-center text-xs text-neutral-darker">
                    {countAnsweredQuestions(sections, answers).answered}/
                    {countAnsweredQuestions(sections, answers).total} pertanyaan
                    wajib terisi
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kirim Jawaban?</DialogTitle>
            <DialogDescription>
              Setelah dikirim, jawabanmu tidak bisa diubah lagi. Pastikan semua
              jawaban sudah benar.
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
              disabled={submitFormResponse.isPending}
              onClick={handleSubmit}
            >
              Ya, Kirim
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
