import { Paperclip } from 'lucide-react';
import React, { useRef } from 'react';

interface CommentFileButtonProps {
  onFileSelected: (file: File) => void; // handle selected media
}

const CommentFileButton: React.FC<CommentFileButtonProps> = ({
  onFileSelected,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelected(files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button type="button" className="p-1" onClick={handleClick}>
        <Paperclip className="size-6 text-green-300" />
      </button>
    </>
  );
};

export default CommentFileButton;
