import { FileText } from 'lucide-react';

type CertificateButtonProps = {
  url: string;
};

export const CertificateButton = ({ url }: CertificateButtonProps) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-inter text-sm font-medium text-[#4285F4] transition-colors hover:text-[#3367D6] lg:text-base"
    >
      <FileText size={18} className="lg:size-5" />
      Lihat Sertifikat
    </a>
  );
};
