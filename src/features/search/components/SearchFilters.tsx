import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import PricingFilter from "./PricingFilter";
import SortFilter from "./SortFilter";
import { SearchedProducts } from "../queries/searchProducts";

const SearchFilters = ({
  handleSearchResultsChange,
  handleCountSearchProducts,
  setIsLoading,
  setKeyword,
  setIsError,
}: {
  handleSearchResultsChange: (products: SearchedProducts) => void;
  handleCountSearchProducts: (keyword: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setKeyword: (keyword: string) => void;
  setIsError: (isError: boolean) => void;
}) => {
  return (
    <div>
      <div className="mb-7">
        <SearchInput
          handleSearchResultsChange={handleSearchResultsChange}
          handleCountSearchProducts={handleCountSearchProducts}
          setIsLoading={setIsLoading}
          setKeyword={setKeyword}
          setIsError={setIsError}
        />
      </div>
      <div className="pr-6 pl-6">
        <div className="mb-7">
          <CategoryFilter />
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
