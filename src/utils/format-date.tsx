import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('en');

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return dayjs(date).fromNow();
};
