"use client";

import { Search } from "lucide-react";
import Border from "../../../app/components/elements/Border";
import {
  searchProducts,
  countSearchProducts,
  SearchedProducts,
} from "../queries/searchProducts";
import { useDebouncedCallback } from "use-debounce";
import { useRef } from "react";

interface SearchInputProps {
  setSearchedProducts: (products: SearchedProducts) => void;
  setSearchProductsCount: (count: number) => void;
  setIsLoading: (isLoading: boolean) => void;
  setKeyword: (keyword: string) => void;
  setIsError: (isError: boolean) => void;
}

const SearchInput = ({
  setSearchedProducts,
  setSearchProductsCount,
  setIsLoading,
  setKeyword,
  setIsError,
}: SearchInputProps) => {
  // 古い検索を上書きしないようにするためのリクエストID管理
  const requestIdRef = useRef(0);

  /**
   * キーワード変更時に検索状態を初期化し、
   * 500msのデバウンス後に検索処理を実行する。
   *
   * @param event 入力イベント
   */
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
        const [products, count] = await Promise.all([
          searchProducts(keyword),
          countSearchProducts(keyword),
        ]);

        // 古い検索なら結果を反映しない
        if (requestId !== requestIdRef.current) return;

        setSearchedProducts(products);
        setSearchProductsCount(count);
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
