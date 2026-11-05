import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import PricingFilter from "./PricingFilter";
import SortFilter from "./SortFilter";

const SearchFilters = () => {
  return (
    <div>
      <div className="mb-4">
        <SearchInput />
      </div>
      <div className="pr-6 pl-6">
        <CategoryFilter />
        <PricingFilter />
        <SortFilter />
      </div>
    </div>
  );
};

export default SearchFilters;
