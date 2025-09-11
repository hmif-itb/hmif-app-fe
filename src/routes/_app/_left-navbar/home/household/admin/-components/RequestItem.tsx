import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import Avatar from '~/components/user/avatar';
import ConfirmationModal from './ConfirmationModal';
import Status, { StatusType } from './Status';

interface RequestData {
  id: number;
  name: string;
  profilePicture?: string;
  startDate: string;
  endDate: string;
  status: string;
  item?: string;
  borrowTime?: string;
  quantity?: number;
  type?: string;
  reason?: string;
}

interface PeminjamanItemProps {
  request: RequestData;
}

export function RequestItem({ request }: PeminjamanItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(request.status);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleApprove = () => {
    setModalState({ isOpen: true, type: 'approve' });
  };

  const handleReject = () => {
    setModalState({ isOpen: true, type: 'reject' });
  };

  const handleConfirm = () => {
    if (modalState.type === 'approve') {
      console.log('Approved request:', request.id);
      setCurrentStatus('accepted');
      // TODO: Call API to update status in backend
    } else {
      console.log('Rejected request:', request.id);
      setCurrentStatus('rejected');
      // TODO: Call API to update status in backend
    }
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  return (
    <>
      <div className="h-fit w-full rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="px-5 py-[14px] lg:p-4">
          {/* Collapsed Content */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Profile Picture */}
              {request.profilePicture ? (
                <Avatar
                  src={request.profilePicture}
                  alt=""
                  className="size-11"
                />
              ) : (
                <div className="flex size-9 min-h-9 min-w-9 items-center justify-center rounded-full bg-amber-600 transition-transform duration-200 ">
                  <span className="text-[14px] font-semibold text-white lg:text-base">
                    {getInitials(request.name)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-black">{request.name}</h3>
                <p className="flex flex-col text-[12px] text-[#525352] lg:flex-row lg:gap-2 lg:text-sm">
                  <span>Mulai: {request.startDate}</span>
                  <span>Selesai: {request.endDate}</span>
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

          {/* Expanded Content with Smooth Transition */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? 'opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {request.item && (
              <div
                className="space-y-4 transition-transform duration-300 ease-in-out"
                style={{
                  transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)',
                }}
              >
                {/* Details Grid */}
                <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 lg:grid-cols-4">
                  <div className="transition-all delay-75 duration-300 ">
                    <p className=" text-sm font-medium text-black">Item:</p>
                    <p className="text-xs text-black">{request.item}</p>
                  </div>
                  <div className="transition-all delay-100 duration-300 ">
                    <p className=" text-sm font-medium text-black">
                      Waktu Peminjaman:
                    </p>
                    <p className="text-xs text-black">{request.borrowTime}</p>
                  </div>
                  <div className="transition-all delay-150 duration-300 ">
                    <p className=" text-sm font-medium text-black">Jumlah:</p>
                    <p className="text-xs text-black">{request.quantity}</p>
                  </div>
                  <div className="transition-all delay-200 duration-300 ">
                    <p className=" text-sm font-medium text-black">Tipe:</p>
                    <p className="text-xs text-black">{request.type}</p>
                  </div>
                </div>

                {/* Reason Section */}
                {request.reason && (
                  <div className="transition-all duration-300">
                    <p className=" text-sm font-medium text-black">Alasan:</p>
                    <p className="text-xs leading-relaxed text-black transition-colors duration-200 hover:text-gray-800">
                      {request.reason}
                    </p>
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
            name: request.name,
            item: request.item || '',
            reason: request.reason || '',
            startDate: request.startDate,
            endDate: request.endDate,
          }}
        />
      )}
    </>
  );
}
