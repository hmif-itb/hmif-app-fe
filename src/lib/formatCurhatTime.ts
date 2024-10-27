import dayjs from 'dayjs';

/**
 * Format timestamp to human readable time for curhat messages
 *
 * @param timestamp - The timestamp to format
 * @returns The formatted time
 */
export default function formatCurhatTime(timestamp: string) {
  const date = dayjs(timestamp);
  const now = dayjs();
  const diff = now.diff(date, 'day');

  if (diff < 1) {
    return date.format('HH:mm');
  } else if (diff < 7) {
    return date.format('dddd HH:mm');
  } else {
    return date.format('DD/MM/YYYY HH:mm');
  }
}
