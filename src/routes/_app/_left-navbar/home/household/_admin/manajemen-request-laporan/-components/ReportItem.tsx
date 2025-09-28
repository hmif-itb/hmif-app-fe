import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Avatar from '~/components/user/avatar';

interface ReportData {
  id: number;
  name: string;
  profilePicture?: string;
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

  return (
    <div className="h-fit w-full rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="px-5 py-2 lg:p-4">
        {/* Collapsed Content */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Profile Picture */}
            {/* TODO: change to correct profile picture */}
            {request.profilePicture ? (
              <Avatar src={request.profilePicture} alt="" className="size-11" />
            ) : (
              <div className="flex size-9 min-h-9 min-w-9 items-center justify-center rounded-full bg-amber-600 transition-transform duration-200 ">
                <span className="text-[14px] font-semibold text-white lg:text-base">
                  {getInitials(request.name)}
                </span>
              </div>
            )}

            <div>
              <h3 className="font-semibold text-black">{request.name}</h3>
              <p className="text-sm text-[#525352]">{request.startDate}</p>
            </div>
          </div>
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

        {/* Expanded Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
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
              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="transition-all duration-300">
                  <p className=" text-sm font-medium text-black">
                    Isi Laporan:
                  </p>
                  <p className="text-sm font-normal leading-relaxed text-black transition-colors duration-200">
                    {request.reportContent}
                  </p>
                </div>
              </div>

              {/* Photo Section */}
              {request.photo && (
                <div className="transition-all duration-300">
                  <p className="text-sm font-medium text-black">Foto:</p>
                  <div className="w-fit overflow-hidden rounded-lg border border-gray-200">
                    <img
                      src={request.photo}
                      alt="Report photo"
                      className="max-h-64 transition-transform duration-200 "
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
