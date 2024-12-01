// import locationLogo from 'assets/images/location.png';
import starIcon from '~/assets/icons/rekomendasi/star.svg';
import locationIcon from '~/assets/icons/rekomendasi/location.svg';
import linkIcon from '~/assets/icons/rekomendasi/link.svg';

interface CoWorkingCardProps {
    imageUrl: string;
    title: string;
    rating: number;
    location: string;
    kampus: "Ganesha" | "Jatinangor";
    mapsLink: string;
}

const CoWorkingCard: React.FC<CoWorkingCardProps> = ({ imageUrl, title, rating, location, kampus, mapsLink }) => {
  return (
    <div className="w-md max-w-80% mx-auto rounded-xl shadow-lg overflow-hidden bg-white relative">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-[544px] object-cover"
        />
      </div>

      <div className='absolute bottom-0 left-0 right-0 mx-auto bg-white rounded-xl'>
        <div className="rounded-2xl">
          <div className='px-4 pt-4 pb-2 rounded-2xl '>
              <div className="flex gap-3 items-center">
                  <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                  <div className="p-1 flex items-center roundedxl bg-yellow-75 text-yellow-500">
                      <div className="ml-1 text-sm">{kampus}</div>
                  </div>
                  <div className="p-1 flex items-center rounded-xl bg-yellow-75 text-yellow-500">
                      <span className="ml-1 text-sm material-icons">
                          <img src={starIcon}></img>
                      </span>
                      <span className="ml-1 text-sm">{rating}</span>
                  </div>
              </div>
          </div>
          <div className='flex flex-col p-4 border-t gap-3 border-[#E2DEE9]'>
              <div className='flex items-center gap-2'>
                  <img src={linkIcon} className="w-4 h-4 inline-block" />
                  <a className="underline text-gray-600" href={mapsLink}>{mapsLink}</a>
              </div>
              <div className='flex items-center gap-2'>
                  <img src={locationIcon} className="w-4 h-4 inline-block" />
                  <p className="text-gray-600">{location}</p>
              </div>
              <a
                href={mapsLink}
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

export default CoWorkingCard;