import { Search } from "lucide-react";

const SearchButton = ({
  handleSearchClick,
}: {
  handleSearchClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={handleSearchClick}
      className="cursor-pointer p-2 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  hover:bg-accent hover:text-accent-foreground lg:hidden"
    >
      <Search />
    </button>
  );
};

export default SearchButton;
