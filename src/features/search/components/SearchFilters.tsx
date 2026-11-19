import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import PricingFilter from "./PricingFilter";
import SortFilter from "./SortFilter";

interface SearchFiltersProps {
  categories: string[];
  onKeywordChange: (nextKeyword: string) => void;
  onCategoryChange: (nextCategories: string[]) => void;
}

const SearchFilters = ({
  categories,
  onKeywordChange,
  onCategoryChange,
}: SearchFiltersProps) => {
  return (
    <div>
      <div className="mb-7">
        <SearchInput onKeywordChange={onKeywordChange} />
      </div>
      <div className="pr-6 pl-6">
        <div className="mb-7">
          <CategoryFilter
            categories={categories}
            onCategoryChange={onCategoryChange}
          />
        </div>
        <div className="mb-7">
          <PricingFilter />
        </div>
        <SortFilter />
      </div>
    </div>
  );
};

export default SearchFilters;
