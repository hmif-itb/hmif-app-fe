import clsx from 'clsx';
import formatCurhatTime from '~/lib/formatCurhatTime';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Button } from '~/components/ui/button';
import ArrowDown from '~/assets/icons/curhat/arrow-down.svg';

type ComponentProps = {
  message: string;
  isSender: boolean;
  timestamp: string;
  repliedMessage?: string;
  onReply?: () => void;
};

export default function MessageBubble(props: Readonly<ComponentProps>) {
  const { message, isSender, timestamp, repliedMessage, onReply } = props;

  return (
    <div
      className={clsx(
        'relative max-w-[75%] break-words rounded-lg px-3 py-2 text-[#2D3648] shadow-md',
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

      {/* Popover actions */}
      <div className="flex justify-end">
        <Popover>
          <PopoverTrigger onClick={(e) => e.stopPropagation()}>
            <img src={ArrowDown} className="size-3" alt="Options" />
          </PopoverTrigger>

          <PopoverContent className="w-fit p-2" align="end">
            <ul className="flex flex-col gap-2">
              <li className="leading-none">
                <Button
                  variant="link"
                  className="p-0 text-xs text-[#2D3648]"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onReply) onReply();
                  }}
                >
                  Reply
                </Button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      {/* Reply preview */}
      {repliedMessage && (
        <div className="my-2 rounded-md bg-[#363538] p-3 text-sm text-[#FFFFFF66]">
          {repliedMessage.length > 95
            ? `${repliedMessage.slice(0, 95)} ...`
            : repliedMessage}
        </div>
      )}

      {/* Message content */}
      <p className="break-words text-sm">{message}</p>

      {/* Timestamp */}
      <p className="w-full text-right text-xs text-gray-400">
        {formatCurhatTime(timestamp)}
      </p>
    </div>
  );
}
