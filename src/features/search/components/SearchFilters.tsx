import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import PricingFilter from "./PricingFilter";
import SortFilter from "./SortFilter";

interface SearchFiltersProps {
  categories: string[];
  pricing_type: string[];
  onKeywordChange: (nextKeyword: string) => void;
  onCategoryChange: (nextCategories: string[]) => void;
  onPricingChange: (nextPricings: string[]) => void;
  onOrderChange: (nextOrder: string) => void;
}

const SearchFilters = ({
  categories,
  pricing_type,
  onKeywordChange,
  onCategoryChange,
  onPricingChange,
  onOrderChange,
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
          <PricingFilter
            pricing_type={pricing_type}
            onPricingChange={onPricingChange}
          />
        </div>
        <SortFilter onOrderChange={onOrderChange} />
      </div>
    </div>
  );
};

export default SearchFilters;
