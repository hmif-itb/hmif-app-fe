import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ReportData {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  reportContent?: string;
  photo?: string;
}

interface ReportItemProps {
  request: ReportData;
}

export function ReportItem({ request }: ReportItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleApprove = () => {
    console.log('Approved request:', request.id);
  };

  const handleReject = () => {
    console.log('Rejected request:', request.id);
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-amber-600 transition-transform duration-200 ">
              <span className="text-base font-semibold text-white">
                {getInitials(request.name)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-black">{request.name}</h3>
              <p className="text-sm text-[#525352]">{request.startDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 transition-colors duration-200">
              {request.status}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="size-8 rounded-md p-1 transition-all duration-200  hover:bg-gray-100"
            >
              <ChevronDown
                className={`size-4 transition-transform duration-300 ease-in-out ${
                  isExpanded ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Expanded Content with Smooth Transition */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {request.reportContent && (
            <div
              className="space-y-4 transition-transform duration-300 ease-in-out"
              style={{
                transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)',
              }}
            >
              {/* Report Content Section */}
              <div className="border-t border-gray-100 pt-4">
                <div className="transition-all duration-300">
                  <p className="mb-2 text-sm font-medium text-black">
                    Isi Laporan:
                  </p>
                  <p className="text-sm leading-relaxed text-black transition-colors duration-200">
                    {request.reportContent}
                  </p>
                </div>
              </div>

              {/* Photo Section */}
              {request.photo && (
                <div className="transition-all duration-300">
                  <p className="mb-2 text-sm font-medium text-black">Foto:</p>
                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={request.photo}
                      alt="Report photo"
                      className="h-auto max-h-64 w-full object-cover transition-transform duration-200 "
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Example usage with sample data
export default function ReportExample() {
  const sampleReport: ReportData = {
    id: 1,
    name: 'Adinda Putri',
    startDate: '03/01/2022',
    endDate: '03/01/2022',
    status: 'Pending',
    reportContent: 'Proyektor tidak bisa menampilkan gambar',
    photo:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-2xl">
        <ReportItem request={sampleReport} />
      </div>
    </div>
  );
}
