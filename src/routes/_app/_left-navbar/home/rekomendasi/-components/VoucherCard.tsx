import starIcon from '~/assets/icons/rekomendasi/star.svg';
import calendarIcon from '~/assets/icons/rekomendasi/calendar.svg';
import linkIcon from '~/assets/icons/rekomendasi/link.svg';

interface VoucherCardProps {
    imageUrl: string;
    title: string;
    rating: number;
    calendar: string;
    link: string;
}

const Vouchercard: React.FC<VoucherCardProps> = ({ imageUrl, title, rating, calendar, link }) => {
  return (
    <div className="w-md max-w-80% mx-auto rounded-xl shadow-lg overflow-hidden bg-white relative">
      {/* Image Section */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Text Content Section */}
      <div className='absolute bottom-0 left-0 right-0 mx-auto bg-white rounded-xl'>
        <div className="rounded-2xl">
          {/* bagian atas */}
          <div className='px-4 pt-4 pb-2 rounded-2xl '>
              <div className="flex gap-3 items-center">
                  <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                  <div className="p-1 flex items-center rounded-xl bg-yellow-75 text-yellow-500">
                      <span className="ml-1 text-sm material-icons">
                          <img src={starIcon}></img>
                      </span>
                      <span className="ml-1 text-sm">{rating}</span>
                  </div>
              </div>
          </div>
          {/* bagian bawah */}
          <div className='flex flex-col p-4 border-t gap-3 border-[#E2DEE9]'>
              <div className='flex items-center gap-2'>
                  <img src={calendarIcon} className="w-4 h-4 inline-block" />
                  <p className="underline text-gray-600">{calendar}</p>
              </div>
              <div className='flex items-center gap-2'>
                  <img src={linkIcon} className="w-4 h-4 inline-block" />
                  <p className="text-gray-600">{link}</p>
              </div>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 block"
              >
                Click image to see details
              </a>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Vouchercard;