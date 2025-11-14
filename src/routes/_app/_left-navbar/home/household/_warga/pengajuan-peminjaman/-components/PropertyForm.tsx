import type React from 'react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { FileText, MapPin, Loader2 } from 'lucide-react';
import { CalendarPicker } from './CalendarPicker';
import { ConfirmationModal } from './ConfirmationModal';
import { SuccessModal } from './SuccessModal';
import { useCreatePengajuan } from '~/hooks/household';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { PropertyData } from '../../../-types';

dayjs.extend(customParseFormat);

interface PropertyLoanFormProps {
  propertyData: PropertyData;
}

export function PropertyLoanForm({ propertyData }: PropertyLoanFormProps) {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    jenisPeminjaman: '' as 'eksklusif' | 'non-eksklusif' | '',
    alasan: '',
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { mutate: createPengajuan, isPending: isSubmitting } =
    useCreatePengajuan();

  const formatTimeInput = (value: string): string => {
    const numbersOnly = value.replace(/\D/g, '');
    let limited = numbersOnly.slice(0, 4);
    if (limited.length >= 2) {
      const hours = parseInt(limited.slice(0, 2), 10);
      if (hours > 23) limited = '23' + limited.slice(2);
    }
    if (limited.length >= 4) {
      const minutes = parseInt(limited.slice(2, 4), 10);
      if (minutes > 59) limited = limited.slice(0, 2) + '59';
    }
    return limited.length >= 3
      ? `${limited.slice(0, 2)}:${limited.slice(2)}`
      : limited;
  };

  const combineDateTime = (dateStr: string, timeStr: string): string | null => {
    if (!dateStr || !timeStr || !dayjs(timeStr, 'HH:mm', true).isValid())
      return null;
    const date = dayjs(dateStr, 'DD/MM/YYYY');
    const [hours, minutes] = timeStr.split(':');
    if (!date.isValid()) return null;
    return date
      .hour(parseInt(hours, 10))
      .minute(parseInt(minutes, 10))
      .toISOString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startDateTime = combineDateTime(
      formData.startDate,
      formData.startTime,
    );
    const endDateTime = combineDateTime(formData.endDate, formData.endTime);

    if (!startDateTime || !endDateTime) {
      alert('Format tanggal atau waktu tidak valid.');
      return;
    }
    if (new Date(startDateTime) >= new Date(endDateTime)) {
      alert('Waktu selesai harus setelah waktu mulai.');
      return;
    }
    if (!formData.jenisPeminjaman) {
      alert('Mohon pilih tipe peminjaman.');
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    const startDateTime = combineDateTime(
      formData.startDate,
      formData.startTime,
    );
    const endDateTime = combineDateTime(formData.endDate, formData.endTime);

    if (!startDateTime || !endDateTime || !formData.jenisPeminjaman) return;

    createPengajuan(
      {
        propertyId: propertyData.id,
        title: `Peminjaman ${propertyData.name}`,
        startDate: startDateTime,
        endDate: endDateTime,
        alasan: formData.alasan || undefined,
        jenisPeminjaman: formData.jenisPeminjaman,
      },
      {
        onSuccess: () => {
          setShowConfirmModal(false);
          setShowSuccessModal(true);
        },
        onError: (error) => {
          setShowConfirmModal(false);
          console.error('Error submitting loan request:', error);
          alert(`Gagal mengajukan: ${error.message}`);
        },
      },
    );
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setFormData({
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      jenisPeminjaman: '',
      alasan: '',
    });
  };

  type FieldName = keyof typeof formData;
  type FieldValue = (typeof formData)[FieldName];

  const handleInputChange = (field: FieldName, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev };
      if (field === 'startTime' || field === 'endTime') {
        newData[field] = formatTimeInput(value);
      } else if (field === 'jenisPeminjaman') {
        // Tambahkan casting tipe di sini
        newData[field] = value as 'eksklusif' | 'non-eksklusif' | '';
      } else {
        newData[field] = value;
      }
      if (field === 'startDate' && prev.endDate && value && prev.endDate) {
        const start = dayjs(value, 'DD/MM/YYYY');
        const end = dayjs(prev.endDate, 'DD/MM/YYYY');
        if (start.isValid() && end.isValid() && start.isAfter(end)) {
          newData.endDate = '';
        }
      }
      return newData;
    });
  };

  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-lg bg-white px-[30px] pb-[74px] pt-[34px] lg:gap-7">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#E8C55F]">
            <FileText className="size-5 text-[#8B6914]" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            Formulir Peminjaman
          </h1>
        </div>
        <span className="font-semibold">
          Properti - {propertyData.name}
          {formData.jenisPeminjaman &&
            ` (${formData.jenisPeminjaman === 'eksklusif' ? 'Eksklusif' : 'Non-Eksklusif'})`}
        </span>

        <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-7">
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-[60px]">
            <div className="space-y-2 lg:max-w-[242px]">
              <Label
                htmlFor="startDate"
                className="text-sm font-medium text-gray-700"
              >
                Tanggal Mulai*
              </Label>
              <CalendarPicker
                value={formData.startDate}
                onChange={(date) => handleInputChange('startDate', date)}
                placeholder="HH/BB/TTTT"
              />
            </div>
            <div className="space-y-2 lg:max-w-[242px]">
              <Label
                htmlFor="endDate"
                className="text-sm font-medium text-gray-700"
              >
                Tanggal Selesai*
              </Label>
              <CalendarPicker
                value={formData.endDate}
                onChange={(date) => handleInputChange('endDate', date)}
                placeholder="HH/BB/TTTT"
                minDate={formData.startDate || undefined}
                startDate={formData.startDate}
                endDate={formData.endDate}
                isEndDatePicker={true}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:w-fit lg:grid-cols-2 lg:gap-[60px] xl:grid-cols-3">
            <div className="w-full space-y-2 lg:w-[242px] lg:max-w-[242px]">
              <Label
                htmlFor="startTime"
                className="text-sm font-medium text-gray-700"
              >
                Waktu Mulai*
              </Label>
              <Input
                id="startTime"
                type="text"
                placeholder="JJ:MM"
                value={formData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                maxLength={5}
                required
              />
            </div>
            <div className="w-full space-y-2 lg:w-[242px] lg:max-w-[242px]">
              <Label
                htmlFor="endTime"
                className="text-sm font-medium text-gray-700"
              >
                Waktu Selesai*
              </Label>
              <Input
                id="endTime"
                type="text"
                placeholder="JJ:MM"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                maxLength={5}
                required
              />
            </div>
            <div className="w-full space-y-2 lg:w-[242px] lg:max-w-[242px]">
              <Label
                htmlFor="jenisPeminjaman"
                className="text-sm font-medium text-gray-700"
              >
                Tipe*
              </Label>
              <Select
                value={formData.jenisPeminjaman}
                onValueChange={(value) =>
                  handleInputChange(
                    'jenisPeminjaman',
                    value as 'eksklusif' | 'non-eksklusif',
                  )
                }
              >
                <SelectTrigger id="jenisPeminjaman">
                  <SelectValue
                    className="text-[14px] text-[#666666] placeholder:text-[#666666]"
                    placeholder="Pilih Tipe"
                  />
                </SelectTrigger>
                <SelectContent className="text-[14px] text-[#666666]">
                  <SelectItem value="eksklusif">Eksklusif</SelectItem>
                  <SelectItem value="non-eksklusif">
                    Non-Eksklusif (Berbagi/Umum)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="alasan"
              className="text-sm font-medium text-gray-700"
            >
              Alasan*
            </Label>
            <Textarea
              id="alasan"
              placeholder="Deskripsikan alasanmu..."
              value={formData.alasan}
              onChange={(e) => handleInputChange('alasan', e.target.value)}
              className="min-h-[184px] resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-lg bg-[#E8C55F] py-3 font-medium text-[#333333] transition-colors hover:opacity-85"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Ajukan Peminjaman'
            )}
          </Button>
        </form>
      </div>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        formData={formData}
        isSubmitting={isSubmitting}
      />
      <SuccessModal isOpen={showSuccessModal} onClose={handleSuccessClose} />
    </>
  );
}
