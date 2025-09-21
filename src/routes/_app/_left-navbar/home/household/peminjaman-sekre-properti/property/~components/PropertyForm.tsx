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
import { CalendarPicker } from './CalendarPicker';

export function PropertyLoanForm() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    type: '',
    reason: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };

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

      {/* Content */}
      <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-7">
        {/* Date Fields */}
        <div className="flex flex-col gap-3 lg:flex-row lg:gap-[60px]">
          <div className="max-w-[242px] space-y-2">
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

          <div className="max-w-[242px] space-y-2">
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
        <div className="grid w-fit grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-[60px]">
          <div className="w-[242px] max-w-[242px] space-y-2">
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
              required
            />
          </div>

          <div className="w-[242px] max-w-[242px] space-y-2">
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
              required
            />
          </div>

          <div className="w-[242px] max-w-[242px] space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-gray-700">
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
          <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
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
  );
}
