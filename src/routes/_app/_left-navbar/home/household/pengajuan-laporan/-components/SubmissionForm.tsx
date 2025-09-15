import { NotebookPen, Upload } from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';

function SubmissionForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted');
  };

  return (
    <div className="flex flex-col gap-[28px] rounded-xl bg-white px-[30px] py-[34px]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-[8px] bg-[#E8C55F]">
          <NotebookPen size={24} />
        </div>
        <h2 className="text-base font-semibold">Formulir Laporan</h2>
      </div>

      {/* Laporan */}
      <div className="space-y-2">
        <label htmlFor="laporan" className="text-sm text-black">
          Laporan*
        </label>
        <Textarea
          id="laporan"
          name="laporan"
          placeholder="Deskripsikan masalah atau laporanmu..."
          className="h-[184px]"
          required
        />
      </div>

      {/* Foto Pendukung */}
      <div className="space-y-2">
        <label htmlFor="foto-pendukung" className="text-sm text-black">
          Foto Pendukung (Opsional)
        </label>
        <div
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="flex h-[184px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-[#BABABA4D] transition-colors hover:bg-gray-50"
        >
          <input
            ref={fileInputRef}
            id="foto-pendukung"
            name="foto-pendukung"
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />

          {selectedFile ? (
            <div className="flex flex-col items-center gap-2">
              <Upload size={24} className="text-gray-600" />
              <span className="truncate text-sm text-gray-600 ">
                {selectedFile.name}
              </span>
              <span className="text-xs text-gray-500">
                Klik untuk mengganti file
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5">
              <div className="flex size-[48px] items-center justify-center rounded-[8px] bg-[#F0F0F0]">
                <Upload size={28} className="text-gray-600" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-600">
                  Upload foto pendukung
                </span>
                <span className="text-xs text-gray-500">
                  Format: JPG, PNG, maksimal 5MB
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Button */}
      <Button
        onClick={handleSubmit}
        className="w-full bg-[#E2C66F] text-[#333333] transition-colors hover:opacity-50"
      >
        Ajukan Laporan
      </Button>
    </div>
  );
}

export default SubmissionForm;
