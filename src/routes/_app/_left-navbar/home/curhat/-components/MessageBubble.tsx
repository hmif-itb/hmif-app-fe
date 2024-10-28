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
        'relative w-[68vw] rounded-lg px-3 py-2 text-[#2D3648] shadow-[0_4px_20px_0_rgba(0,0,0,0.3)]',
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
      <p className="text-sm">{message}</p>
      <p className="w-full text-right text-xs text-gray-400">
        {formatCurhatTime(timestamp)}
      </p>
    </div>
  );
}
