import { useState } from 'react';
import SearchIcon from '~/assets/icons/curhat/search-icon.svg';
import FilterIcon from '~/assets/icons/curhat/filter.svg';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { CheckboxGroup, CheckboxItem } from '~/components/ui/checkbox';
import { Separator } from '~/components/ui/separator';

function SearchAndFilter() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filter, setFilter] = useState({
    category: ['unread'],
    label: ['follow-up'],
  });

  const toggleFilterVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFilterVisible((prev) => !prev);
  };

  const handleCategoryChange = (selectedCategory: string[]) => {
    // Allow only one selection
    if (selectedCategory.length > 0) {
      setFilter((prev) => ({
        ...prev,
        category: [selectedCategory[selectedCategory.length - 1]],
      }));
    }
  };

  const handleLabelChange = (selectedLabel: string[]) => {
    // Allow only one selection
    if (selectedLabel.length > 0) {
      setFilter((prev) => ({
        ...prev,
        label: [selectedLabel[selectedLabel.length - 1]],
      }));
    }
  };

  const resetFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilter({
      category: ['unread'],
      label: ['follow-up'],
    });
  };

  return (
    <div className="relative w-[95%]">
      <form className="ml-[9px] mr-[58px] flex w-full flex-col gap-4">
        {/* Search Bar and Filter Button */}
        <div className="flex items-center gap-[2px]">
          <div className="flex h-10 w-full grow items-center overflow-hidden rounded-full border border-black">
            <Input
              type="text"
              placeholder="Search..."
              className="grow border-none font-semibold text-gray-700 outline-none"
            />
            <Button
              variant="solid"
              size="icon-sm"
              className="rounded-full bg-[#305138] hover:bg-green-200"
            >
              <img src={SearchIcon} alt="Search Icon" className="size-6" />
            </Button>
          </div>

          {/* Filter Button */}
          <Button
            variant="link"
            className="transition-transform hover:scale-105"
            size="icon-sm"
            onClick={toggleFilterVisibility}
          >
            <img src={FilterIcon} alt="Filter Icon" />
          </Button>
        </div>

        {/* Filtercard */}
        {isFilterVisible && (
          <div className="absolute left-3 right-0 top-8 z-10 mx-auto w-full max-w-[350px] rounded-[15px] bg-gray-100 p-3 shadow-md">
            <div className="mx-auto h-2 w-[50px] rounded-full bg-[#3C3C434D]" />
            <div className="mt-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-bold">Filters</h3>
                <Button
                  variant="link"
                  size="sm"
                  className="text-sm font-semibold text-[#223927]"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Category</p>
                <Separator className="my-[9px] border-t-[1.3px] border-[#8e8e93]" />
                <CheckboxGroup
                  choices={['read', 'unread']}
                  selectedValues={filter.category}
                  onChange={handleCategoryChange}
                  className="w-[250px] grid-flow-col-dense gap-3"
                />
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Label</p>
                <Separator className="my-[9px] border-t-[1.3px] border-[#8e8e93]" />
                <CheckboxGroup
                  choices={['follow-up', 'other']}
                  selectedValues={filter.label}
                  onChange={handleLabelChange}
                  className="w-[250px] grid-flow-col-dense gap-3"
                />
              </div>
              <Separator className="mb-[13px] mt-[60px] border-t-[1.3px] border-[#8e8e93]" />
              <div className="mb-[18px] flex items-center justify-center gap-3">
                <Button
                  variant="outlined"
                  className="w-[100px] bg-[#305138] text-white"
                  size="sm"
                  onClick={toggleFilterVisibility}
                >
                  Apply
                </Button>
                <Button
                  variant="solid"
                  className="w-[100px] border-[1.7px] border-solid border-[#305138] bg-transparent text-black"
                  size="sm"
                  onClick={toggleFilterVisibility}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchAndFilter;
