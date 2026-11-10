"use client";

import { Search } from "lucide-react";
import Border from "../../../app/components/elements/Border";
import { searchProducts, SearchedProducts } from "../queries/searchProducts";

const SearchInput = ({
  handleSearchResultsChange,
  handleCountSearchProducts,
  setIsLoading,
}: {
  handleSearchResultsChange: (products: SearchedProducts) => void;
  handleCountSearchProducts: (keyword: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const handleKeywordChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const keyword = event.target.value;
    setIsLoading(true);
    const products = await searchProducts(keyword);
    setIsLoading(false);

    handleCountSearchProducts(keyword);
    handleSearchResultsChange(products);
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4 pr-6 pl-6">
        <Search className="text-primary size-6" />
        <input
          type="search"
          placeholder="プロダクト名、タグ、技術スタックを検索..."
          className="w-full focus:outline-none"
          maxLength={100}
          onChange={handleKeywordChange}
        />
      </div>
      <Border />
    </>
  );
};

export default SearchInput;
