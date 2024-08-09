import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface AddEventProps {
  category: string;
  setCategory: (category: string) => void;
  showAddEventModal: boolean;
  setShowAddEventModal: (show: boolean) => void;
}

function AddEvent({
  category,
  setCategory,
  showAddEventModal,
  setShowAddEventModal,
}: AddEventProps) {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [startTime, setStartTime] = useState(
    dayjs().startOf('minute').format('HH:mm'),
  );
  const [endTime, setEndTime] = useState(
    dayjs().add(1, 'hour').startOf('minute').format('HH:mm'),
  );

  const addEventModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        addEventModalRef.current &&
        !addEventModalRef.current.contains(event.target as Node)
      ) {
        setShowAddEventModal(false);
      }
    };

    if (showAddEventModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowAddEventModal, showAddEventModal]);

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isStartTimePickerVisible, setIsStartTimePickerVisible] =
    useState(false);
  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);

  const formatDate = (date: string) => dayjs(date).format('dddd, MMMM D');

  useEffect(() => {
    const now = dayjs();
    const roundedMinutes = Math.ceil(now.minute() / 5) * 5;
    const start = now.minute(roundedMinutes).second(0);
    const end = start.add(1, 'hour');
    setStartTime(start.format('HH:mm'));
    setEndTime(end.format('HH:mm'));
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800/75">
      <div
        ref={addEventModalRef}
        className="w-[550px] rounded-xl bg-white shadow-xl"
      >
        <div className="flex w-full justify-end rounded-t-xl bg-gray-300 px-4 py-3">
          <button onClick={() => setShowAddEventModal(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="px-10 py-8">
          <div className="mb-4 ml-11">
            <input
              type="text"
              placeholder="Add title"
              className="w-full border-0 border-b-2 border-gray-300 text-3xl font-medium placeholder:text-3xl focus:border-gray-500 focus:outline-0"
            />
          </div>
          <div className="mb-6 ml-11 flex gap-2">
            <button
              className={cn(
                category === 'Akademik' && 'bg-yellow-100 text-green-500',
                category === 'Blank' && 'border border-gray-800 bg-white',
                'flex flex-row items-center gap-2 rounded-md px-4 py-2 font-medium',
              )}
              onClick={() => setCategory('Akademik')}
            >
              <img src="/img/icons/akademikEvent.svg" />
              Akademik
            </button>
            <button
              className={cn(
                category === 'Blank' && 'bg-yellow-100 text-green-500',
                category === 'Akademik' && 'border border-gray-800 bg-white',
                'flex flex-row items-center gap-2 rounded-md px-4 py-2 font-medium',
              )}
              onClick={() => setCategory('Blank')}
            >
              <img src="/img/icons/blankEvent.svg" />
              Blank
            </button>
          </div>
          <div className="mb-5">
            <div className="flex items-center gap-2">
              <img src="/img/icons/clock.svg" className="mr-3" />
              <input
                type={isDatePickerVisible ? 'date' : 'text'}
                className="border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-0"
                value={isDatePickerVisible ? date : formatDate(date)}
                onChange={(e) => {
                  setDate(e.target.value);
                  setIsDatePickerVisible(false);
                }}
                onFocus={() => setIsDatePickerVisible(true)}
                onBlur={() => {
                  if (!date) setIsDatePickerVisible(false);
                }}
              />
              <input
                type={isStartTimePickerVisible ? 'time' : 'text'}
                className="w-20 border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-0"
                step="300"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setIsStartTimePickerVisible(false);
                }}
                onFocus={() => setIsStartTimePickerVisible(true)}
                onBlur={() => {
                  if (!startTime) setIsStartTimePickerVisible(false);
                }}
              />
              -
              <input
                type={isEndTimePickerVisible ? 'time' : 'text'}
                className="w-20 border-0 border-b-2 border-gray-300 focus:border-gray-500 focus:outline-0"
                step="300"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  setIsEndTimePickerVisible(false);
                }}
                onFocus={() => setIsEndTimePickerVisible(true)}
                onBlur={() => {
                  if (!endTime) setIsEndTimePickerVisible(false);
                }}
              />
            </div>
          </div>
          <div className="mb-5 flex items-start gap-2">
            <img src="/img/icons/eventSubject.svg" className="mr-3" />
            <input
              type="text"
              placeholder="Add subject"
              className="w-full border-0 placeholder:text-base focus:border-b-2 focus:border-gray-500 focus:outline-0"
            />
          </div>
          <div className="mb-5 flex items-start gap-2">
            <img src="/img/icons/description.svg" className="mr-3" />
            <textarea
              placeholder="Add description"
              className="w-full border-0 placeholder:text-base focus:border-b-2 focus:border-gray-500 focus:outline-0"
              rows={1}
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-green-300 text-white"
              onClick={() => setShowAddEventModal(false)}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
