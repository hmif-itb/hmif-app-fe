import { Chatroom, ChatroomLabel } from '~/api/generated';
import { useMemo, useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '~/api/client';
import { cn } from '~/lib/utils';

type ComponentProps = {
  chatroom: Chatroom;
};

export default function LabelDropdown({
  chatroom,
}: ComponentProps): JSX.Element {
  const [labelDropdownOpen, setLabelDropdownOpen] = useState(false);

  const { data: chatroomLabels } = useQuery({
    queryKey: ['chatroomlabels', chatroom.id],
    queryFn: () => chatroom.labels?.map((l) => l.label) ?? null,
  });

  // implement when api endpoint for labels is finished
  const addLabel = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chatroomlabels', chatroom.id],
      });
    },
  });

  // implement when api endpoint for labels is finished
  const removeLabel = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chatroomlabels', chatroom.id],
      });
    },
  });

  // change how to fetch labels to use query when api endpoint is finished
  const { data: allLabels } = useQuery({
    queryKey: ['allchatroomlabels'],
    queryFn: () => [
      {
        id: '0',
        title: 'test',
      },
      {
        id: '1',
        title: 'test2',
      },
    ],
  });

  const labelOptions = useMemo(() => {
    return allLabels?.filter(
      (label) => !chatroomLabels?.some((l) => l.id === label.id),
    );
  }, [chatroomLabels, allLabels]);

  // implement when api endpoint for labels is finished
  const handleAddLabel = (id: string) => {
    addLabel.mutate();
  };

  // implement when api endpoint for labels is finished
  const handleRemoveLabel = (id: string) => {
    removeLabel.mutate();
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Popover open={labelDropdownOpen} onOpenChange={setLabelDropdownOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="link"
            className="items-center p-0 text-sm font-normal md:text-sm"
          >
            Add Label
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <Command>
            <CommandInput placeholder="Select a label..." />
            <CommandList>
              {labelOptions?.map((label, idx) => (
                <CommandItem
                  value={label.id}
                  keywords={[label.title]}
                  onSelect={() => {
                    if (chatroomLabels?.map((l) => l.id).includes(label.id))
                      handleRemoveLabel(label.id);
                    else handleAddLabel(label.id);
                  }}
                  className="gap-2"
                  key={idx}
                >
                  <p>{label.title}</p>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
