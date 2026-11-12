"use client";

import { Search } from "lucide-react";
import Border from "../../../app/components/elements/Border";
import { searchProducts, SearchedProducts } from "../queries/searchProducts";
import { useDebouncedCallback } from "use-debounce";
import { useRef } from "react";

const SearchInput = ({
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
  // 古い検索を上書きしないようにするためのリクエストID管理
  const requestIdRef = useRef(0);

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;

    // 入力が変わった時点でリクエストIDを更新
    const requestId = ++requestIdRef.current;

    setKeyword(keyword);
    setIsError(false);
    setIsLoading(true);

    debounced(keyword, requestId);
  };

  const debounced = useDebouncedCallback(
    async (keyword: string, requestId: number) => {
      try {
        const products = await searchProducts(keyword);

        // 古い検索なら結果を反映しない
        if (requestId !== requestIdRef.current) return;

        handleCountSearchProducts(keyword);
        handleSearchResultsChange(products);
      } catch (error) {
        if (requestId !== requestIdRef.current) return;

        console.error(error);
        setIsError(true);
      } finally {
        // 最新の検索の場合のみローディングを終了
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    },
    500,
  );

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
