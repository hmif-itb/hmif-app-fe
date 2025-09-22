'use client';

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
import { FileText } from 'lucide-react';
import { CalendarPicker } from '../../../-components/CalendarPicker';
import { ConfirmationModal } from '../../../-components/ConfirmationModal';
import { SuccessModal } from '../../../-components/SuccessModal';

export function SekreLoanForm() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    type: '',
    reason: '',
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format time input to HH:MM with validation
  const formatTimeInput = (value: string): string => {
    // Remove all non-numeric characters
    const numbersOnly = value.replace(/\D/g, '');

    // Limit to 4 digits
    let limited = numbersOnly.slice(0, 4);

    // Validate hours (00-23)
    if (limited.length >= 2) {
      const hours = parseInt(limited.slice(0, 2));
      if (hours > 23) {
        limited = '23' + limited.slice(2);
      }
    }

    // Validate minutes (00-59)
    if (limited.length >= 4) {
      const minutes = parseInt(limited.slice(2, 4));
      if (minutes > 59) {
        limited = limited.slice(0, 2) + '59';
      }
    }

    // Format as HH:MM
    if (limited.length >= 3) {
      return `${limited.slice(0, 2)}:${limited.slice(2)}`;
    } else if (limited.length >= 1) {
      return limited;
    }

    return '';
  };

  // Dummy function to simulate API call
  const submitLoanRequest = async () => {
    console.log('Submitting loan request...', formData);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Loan request submitted successfully!');
        resolve(true);
      }, 1500);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitLoanRequest();
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error submitting loan request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // Reset form after successful submission
    setFormData({
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      type: '',
      reason: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev };

      // Handle time fields with formatting
      if (field === 'startTime' || field === 'endTime') {
        newData[field] = formatTimeInput(value);
      } else {
        newData[field] = value;
      }

      // If changing start date and it's after end date, reset end date
      if (field === 'startDate' && prev.endDate) {
        const startDate = parseDate(value);
        const endDate = parseDate(prev.endDate);
        if (startDate && endDate && startDate > endDate) {
          newData.endDate = '';
        }
      }

      return newData;
    });
  };

  const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    return new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
    );
  };

  return (
    <>
      <div className="flex w-full flex-col gap-3 rounded-lg bg-white px-[30px] pb-[74px] pt-[34px] lg:gap-7">
        {/* Header */}
        <div className=" ">
          <div className="flex items-center gap-3">
            <div
              className="flex size-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: '#E8C55F' }}
            >
              <FileText className="size-5" style={{ color: '#8B6914' }} />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Formulir Peminjaman
            </h1>
          </div>
        </div>

        {/* Type */}
        <span className="font-semibold">
          Sekre -{' '}
          {formData.type
            ? formData.type.charAt(0).toUpperCase() + formData.type.slice(1)
            : ''}
        </span>

        {/* Content */}
        <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-7">
          {/* Date Fields */}
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
                minDate={formData.startDate}
                startDate={formData.startDate}
                endDate={formData.endDate}
                isEndDatePicker={true}
              />
            </div>
          </div>

          {/* Time and Type Fields */}
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
                htmlFor="type"
                className="text-sm font-medium text-gray-700"
              >
                Tipe*
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
              >
                <SelectTrigger>
                  <SelectValue
                    className="text-[14px] text-[#666666] placeholder:text-[#666666]"
                    placeholder="Eksklusif"
                  />
                </SelectTrigger>
                <SelectContent className="text-[14px] text-[#666666]">
                  <SelectItem value="eksklusif">Eksklusif</SelectItem>
                  <SelectItem value="berbagi">Berbagi</SelectItem>
                  <SelectItem value="umum">Umum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reason Field */}
          <div className="space-y-2">
            <Label
              htmlFor="reason"
              className="text-sm font-medium text-gray-700"
            >
              Alasan*
            </Label>
            <Textarea
              id="reason"
              placeholder="Deskripsikan alasanmu dalam mengajukan pinjaman..."
              value={formData.reason}
              onChange={(e) => handleInputChange('reason', e.target.value)}
              className="min-h-[184px] resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full rounded-lg bg-[#E8C55F] py-3 font-medium text-[#333333] transition-colors hover:opacity-85"
          >
            Ajukan Peminjaman
          </Button>
        </form>
      </div>

      {/* Modals */}
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
