

type ComponentProps = {
    activeOption: 'CoWorking' | 'Voucher';
    onToggle: (option: 'CoWorking' | 'Voucher') => void;
}

const MenuPage: React.FC<ComponentProps>   = ({ activeOption, onToggle }) => {
  return (
    <div className="flex w-full rounded-full overflow-hidden border border-gray-300 shadow-md">
        <button
            className={`w-1/2 py-2 font-bold transition-colors duration-200 ${
                activeOption === 'CoWorking'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-white'
            }`}
            onClick={() => onToggle('CoWorking')}
        >
            Co-Working Spaces
        </button>
        <button
            className={`w-1/2 py-2 font-bold transition-colors duration-200 ${
                activeOption === 'Voucher'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-white'
            }`}
            onClick={() => onToggle('Voucher')}
        >
            Vouchers
        </button>
    </div>
  )
}

export default MenuPage;