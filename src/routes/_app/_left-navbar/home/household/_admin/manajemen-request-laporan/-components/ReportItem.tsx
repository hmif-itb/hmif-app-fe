import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ReportData } from '../../../-types';
import Avatar from '~/components/user/avatar';
import ConfirmationModal from './ConfirmationModal';
import Status, { StatusType } from './Status';
import { useUpdateLaporanStatus } from '~/hooks/household';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

interface ReportItemProps {
  request: ReportData;
}

export function ReportItem({ request }: ReportItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(request.status);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const updateStatusMutation = useUpdateLaporanStatus();

  const startDateFormatted = useMemo(() => {
    const date = dayjs(request.startDate);
    return date.isValid() ? date.format('DD/MM/YYYY') : request.startDate;
  }, [request.startDate]);

  const handleApprove = () => {
    setModalState({ isOpen: true, type: 'approve' });
  };

  const handleReject = () => {
    setModalState({ isOpen: true, type: 'reject' });
  };

  const handleConfirm = () => {
    if (modalState.type === 'approve') {
      console.log('Approving report:', request.id);
      updateStatusMutation.mutate(
        {
          laporanId: request.id,
          data: { status: 'accepted' },
        },
        {
          onSuccess: () => {
            setCurrentStatus('accepted');
          },
          onError: () => {
            toast.error('Gagal menyetujui laporan. Silakan coba lagi.');
            setCurrentStatus(request.status);
          },
        },
      );
    } else if (modalState.type === 'reject') {
      console.log('Rejecting report:', request.id);
      updateStatusMutation.mutate(
        {
          laporanId: request.id,
          data: { status: 'rejected' },
        },
        {
          onSuccess: () => {
            setCurrentStatus('rejected');
          },
          onError: () => {
            toast.error('Gagal menolak laporan. Silakan coba lagi.');
            setCurrentStatus(request.status);
          },
        },
      );
    }
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <div className="h-fit w-full rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="px-5 py-2 lg:p-4">
          {/* Collapsed Content */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Profile Picture */}
              {/* TODO: change to correct profile picture */}
              {request.profilePicture ? (
                <Avatar
                  src={request.profilePicture}
                  alt=""
                  className="size-11"
                />
              ) : (
                <div className="flex size-9 min-h-9 min-w-9 items-center justify-center rounded-full bg-amber-600 transition-transform duration-200 ">
                  <span className="text-[14px] font-semibold text-white lg:text-base">
                    {getInitials(request.borrowerName)}
                  </span>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-black">
                  {request.borrowerName}
                </h3>
                <p className="text-[12px] font-semibold text-[#525352] lg:text-sm">
                  {request.item.charAt(0).toUpperCase() + request.item.slice(1)}
                </p>
                <p className="mt-1 text-[12px] text-[#525352] lg:text-sm">
                  {startDateFormatted}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Status status={currentStatus.toLowerCase() as StatusType} />
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="size-8 rounded-md p-1 transition-all duration-200 hover:scale-110 hover:bg-gray-100"
              >
                <ChevronDown
                  className={`size-4 transition-transform duration-300 ease-in-out ${
                    isExpanded ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
            </div>
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

                {/* Action Buttons - Only show if status is pending */}
                {currentStatus.toLowerCase() === 'pending' && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleReject}
                      className="flex-1 rounded-full border border-[#B01212] bg-transparent px-4 py-2 text-[#B01212] transition-all duration-300  hover:bg-[#B01212]/5 hover:shadow-lg"
                    >
                      Tolak
                    </button>
                    <button
                      onClick={handleApprove}
                      className="flex-1 rounded-full bg-[#305138] px-4 py-2 text-white transition-all duration-300  hover:bg-[#305138]/90 hover:shadow-lg"
                    >
                      Setujui
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {modalState.type && (
        <ConfirmationModal
          isOpen={modalState.isOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          type={modalState.type}
          requestData={{
            borrowerName: request.borrowerName,
            item: request.item || '',
            reason: request.reportContent || '',
            startDate: request.startDate,
            endDate: request.endDate,
          }}
        />
      )}
    </>
  );
}
