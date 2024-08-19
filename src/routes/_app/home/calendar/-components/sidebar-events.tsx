import React, { useState } from 'react';
import SidebarEventLabel from './sidebar-event-label';
import { api } from '~/api/client';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

type SidebarProps = {
  currentDate: number;
  currentMonth: number;
  currentYear: number;
};

export default function SidebarEvents({
  currentDate,
  currentMonth,
  currentYear,
}: SidebarProps) {
  const { data: akademik } = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: () =>
      api.calendar.getCalendarEvent({
        category: 'Akademik',
        year: currentYear.toString(),
      }),
  });

  const { data: himpunan } = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: () =>
      api.calendar.getCalendarEvent({
        category: 'Himpunan',
        year: currentYear.toString(),
      }),
  });

  function isToday(start: string) {
    return (
      dayjs(start).date() === currentDate &&
      dayjs(start).month() === currentMonth
    );
  }

  return (
    <>
      <p className="text-lg font-bold">Akademik</p>
      <div className="flex h-full flex-col gap-1.5 overflow-y-scroll">
        {akademik?.map((event, index) => {
          return isToday(event.start) ? (
            <SidebarEventLabel key={index} event={event} />
          ) : null;
        })}
      </div>
      <p className="text-lg font-bold">Himpunan</p>
      <div className="flex h-full flex-col gap-1.5 overflow-y-scroll">
        {himpunan?.map((event, index) => {
          return isToday(event.start) ? (
            <SidebarEventLabel key={index} event={event} />
          ) : null;
        })}
      </div>
    </>
  );
}
