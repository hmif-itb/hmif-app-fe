import { useState } from "react";
import SearchIcon from "~/assets/icons/curhat/search-icon.svg";
import FilterIcon from "~/assets/icons/curhat/filter.svg";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { CheckboxGroup, CheckboxItem } from "~/components/ui/checkbox";
import { Separator } from "~/components/ui/separator";

function SearchAndFilter() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filter, setFilter] = useState({
    category: ["unread"],
    label: ["follow-up"],
  });

  const toggleFilterVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFilterVisible((prev) => !prev);
  };

  const handleCategoryChange = (selectedCategory: string[]) => {
  // Allow only one selection
  if (selectedCategory.length > 0) {
    setFilter((prev) => ({ ...prev, category: [selectedCategory[selectedCategory.length - 1]] }));
  }
};

  const handleLabelChange = (selectedLabel: string[]) => {
    // Allow only one selection
    if (selectedLabel.length > 0) {
      setFilter((prev) => ({ ...prev, label: [selectedLabel[selectedLabel.length - 1]] }));
    }
  };

  const resetFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilter({
      category: ["unread"],
      label: ["follow-up"],
    });
  };

  return (
    <div className="relative w-[95%]">
      <form className="flex flex-col gap-4 ml-[9px] mr-[58px] w-full">
        {/* Search Bar and Filter Button */}
        <div className="flex items-center gap-[2px]">
          <div className="flex items-center border border-black rounded-full overflow-hidden flex-grow h-10 w-full">
            <Input
              type="text"
              placeholder="Search..."
              className="flex-grow border-none outline-none font-semibold text-gray-700"
            />
            <Button
              variant="solid"
              size="icon-sm"
              className="bg-[#305138] hover:bg-green-200 rounded-full"
            >
              <img src={SearchIcon} alt="Search Icon" className="w-6 h-6" />
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
          <div className="absolute top-8 left-3 right-0 z-10 bg-gray-100 shadow-md rounded-[15px] p-3 w-full max-w-[350px] mx-auto">
            <div className="mx-auto h-2 w-[50px] rounded-full bg-[#3C3C434D]" />
            <div className="flex flex-col mt-2 gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-[20px] font-bold">Filters</h3>
                <Button
                  variant="link"
                  size="sm"
                  className="text-sm text-[#223927] font-semibold"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Category</p>
                <Separator className="mt-[9px] mb-[9px] border-t-[1.3px] border-[#8e8e93]"/>
                <CheckboxGroup
                  choices={["read", "unread"]}
                  selectedValues={filter.category}
                  onChange={handleCategoryChange}
                  className="w-[250px] grid-flow-col-dense gap-3"
                />
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Label</p>
                <Separator className="mt-[9px] mb-[9px] border-t-[1.3px] border-[#8e8e93]"/>
                <CheckboxGroup
                  choices={["follow-up", "other"]}
                  selectedValues={filter.label}
                  onChange={handleLabelChange}
                  className="w-[250px] grid-flow-col-dense gap-3"
                />
              </div>
              <Separator className="mt-[60px] mb-[13px] border-t-[1.3px] border-[#8e8e93]"/>
              <div className="mb-[18px] flex justify-center gap-3 items-center">
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
                  className="w-[100px] bg-transparent text-black border-solid border-[1.7px] border-[#305138]"
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