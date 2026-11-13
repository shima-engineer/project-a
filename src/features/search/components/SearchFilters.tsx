import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import PricingFilter from "./PricingFilter";
import SortFilter from "./SortFilter";
import { SearchedProducts } from "../queries/searchProducts";

interface SearchFiltersProps {
  setSearchedProducts: (products: SearchedProducts) => void;
  setSearchProductsCount: (count: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setKeyword: (keyword: string) => void;
  setIsError: (isError: boolean) => void;
}

const SearchFilters = ({
  setSearchedProducts,
  setSearchProductsCount,
  setIsLoading,
  setKeyword,
  setIsError,
}: SearchFiltersProps) => {
  return (
    <div>
      <div className="mb-7">
        <SearchInput
          setSearchedProducts={setSearchedProducts}
          setSearchProductsCount={setSearchProductsCount}
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
