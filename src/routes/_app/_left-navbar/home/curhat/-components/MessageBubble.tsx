import clsx from 'clsx';
import formatCurhatTime from '~/lib/formatCurhatTime';

type ComponentProps = {
  message: string;
  isSender: boolean;
  timestamp: string;
};

export default function MessageBubble(props: Readonly<ComponentProps>) {
  const { message, isSender, timestamp } = props;

  return (
    <div
      className={clsx(
        'relative max-w-[75%] rounded-lg px-3 py-2 text-[#2D3648] shadow-md break-words',
        isSender
          ? 'mr-3.5 self-end bg-[#FFFC83]'
          : 'ml-3.5 self-start bg-[#C0EACA]',
      )}
    >
      <div
        className={clsx(
          'absolute top-2 size-2.5 rotate-45',
          isSender
            ? 'right-0 translate-x-1/2 bg-[#FFFC83]'
            : 'left-0 -translate-x-1/2 bg-[#C0EACA]',
        )}
      ></div>
      <p className="text-sm break-words">{message}</p>
      <p className="w-full text-right text-xs text-gray-400">
        {formatCurhatTime(timestamp)}
      </p>
    </div>
  );
}
