"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "../../../../components/ui/dialog";
import { DEFAULT_DISPLAY_COUNT } from "../constants";
import type { SearchParams } from "../types";
import { Spinner } from "@/components/ui/spinner";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import SearchFilters from "./SearchFilters";
import SearchResult from "./SearchResult";
import Border from "@/app/components/elements/Border";
import { useState, useRef } from "react";
import {
  SearchedProducts,
  countSearchProducts,
  searchProducts,
} from "../queries/searchProducts";
import type { Users } from "@/features/auth/queries/getCurrentUser";
import { useDebouncedCallback } from "use-debounce";

interface SearchModalProps {
  isSearchModalOpen: boolean;
  onSearchModalClose: () => void;
  votedProductIds: Set<string>;
  user: Users;
}

export default function SearchModal({
  isSearchModalOpen,
  onSearchModalClose,
  votedProductIds,
  user,
}: SearchModalProps) {
  const [searchedProducts, setSearchedProducts] = useState<SearchedProducts>(
    [],
  );
  const [searchProductsCount, setSearchProductsCount] = useState<number>(0);
  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [pricing_type, setPricingType] = useState<string[]>([]);
  const [order, setOrder] = useState<string>("popular");
  const [productCount, setProductCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 「すべて表示」ボタンの読み込み状態を管理する
  const [isViewAllLoading, setIsViewAllLoading] = useState<boolean>(false);
  const [isViewAllError, setIsViewAllError] = useState<boolean>(false);
  const [isTakeAll, setIsTakeAll] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // 検索モーダル内で投票状態を更新するため、
  // 親から受け取った投票済みIDを初期値として保持する
  const [votedIds, setVotedIds] = useState<Set<string>>(
    () => new Set(votedProductIds),
  );

  const requestIdRef = useRef(0);

  // 表示するプロダクトのリストを取得
  // takeAllがtrueの場合は全件、それ以外はデフォルト表示件数まで
  const displayedProducts = isTakeAll
    ? searchedProducts
    : searchedProducts.slice(0, DEFAULT_DISPLAY_COUNT);

  /**
   * デバウンスされた検索処理
   *
   * @param params - 検索パラメータ
   * @param requestId - リクエストID
   */
  const debouncedSearch = useDebouncedCallback(
    async (params: SearchParams, requestId: number) => {
      try {
        const [products, count] = await Promise.all([
          searchProducts(params),
          countSearchProducts(params),
        ]);

        // 古いリクエストなら反映しない
        if (requestId !== requestIdRef.current) return;

        setSearchedProducts(products);
        setSearchProductsCount(count);
        setProductCount(count);

        if (params.takeAll) {
          setIsTakeAll(true);
        }
      } catch (error) {
        if (requestId !== requestIdRef.current) return;

        console.error(error);

        if (params.takeAll) {
          setIsViewAllError(true);
        } else {
          setIsError(true);
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
          setIsViewAllLoading(false);
        }
      }
    },
    500,
  );

  const handleSearch = (params: SearchParams) => {
    const requestId = ++requestIdRef.current;

    if (
      !params.keyword.trim() &&
      params.categories.length === 0 &&
      params.pricing_type.length === 0
    ) {
      debouncedSearch.cancel();
      setSearchedProducts([]);
      setSearchProductsCount(0);
      setIsLoading(false);
      return;
    }

    setIsViewAllError(false);

    if (params.takeAll) {
      setIsViewAllLoading(true);
    } else {
      setIsError(false);
      setIsTakeAll(false);
      setIsLoading(true);
    }

    debouncedSearch(params, requestId);
  };

  const handleKeywordChange = (nextKeyword: string) => {
    setKeyword(nextKeyword);

    handleSearch({
      keyword: nextKeyword,
      categories,
      pricing_type,
      order,
      takeAll: false,
    });
  };

  const handleCategoryChange = (nextCategories: string[]) => {
    setCategories(nextCategories);

    handleSearch({
      keyword,
      categories: nextCategories,
      pricing_type,
      order,
      takeAll: false,
    });
  };

  const handlePricingChange = (nextPricings: string[]) => {
    setPricingType(nextPricings);

    handleSearch({
      keyword,
      categories,
      pricing_type: nextPricings,
      order,
      takeAll: false,
    });
  };

  const handleOrderChange = (nextOrder: string) => {
    setOrder(nextOrder);

    handleSearch({
      keyword,
      categories,
      pricing_type,
      order: nextOrder,
      takeAll: false,
    });
  };

  /**
   * 投票成功後、検索結果の投票数と投票済みIDを更新する。
   *
   * 検索結果を再取得せずに、投票後の状態を画面へ反映するために使用する。
   *
   * @param productId - 投票対象のプロダクトID
   * @param voted - 更新後の投票状態
   */
  const handleUpvoteSuccess = (productId: string, voted: boolean) => {
    // 投票数を更新する
    setSearchedProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              upvotes_count: product.upvotes_count + (voted ? 1 : -1),
            }
          : product,
      ),
    );

    // 投票済みIDを更新する
    setVotedIds((prev) => {
      const next = new Set(prev);

      if (voted) {
        next.add(productId);
      } else {
        next.delete(productId);
      }

      return next;
    });
  };

  return (
    <Dialog
      open={isSearchModalOpen}
      onOpenChange={(open) => !open && onSearchModalClose()}
    >
      <DialogContent className="sm:max-w-none w-[calc(100%-40px)] p-0 pt-6 pb-6 rounded-xl bg-white text-slate-800 border-none gap-0 max-h-[calc(100dvh-40px)] overflow-y-auto">
        <div className="text-left">
          <DialogHeader>
            <VisuallyHidden.Root>
              <DialogTitle>プロダクトを検索</DialogTitle>
            </VisuallyHidden.Root>
          </DialogHeader>
          <div>
            <div className="mb-4">
              <SearchFilters
                categories={categories}
                pricing_type={pricing_type}
                onKeywordChange={handleKeywordChange}
                onCategoryChange={handleCategoryChange}
                onPricingChange={handlePricingChange}
                onOrderChange={handleOrderChange}
              />
            </div>
            {(keyword.trim() !== "" ||
              categories.length > 0 ||
              pricing_type.length > 0) && (
              <>
                <div className="mb-4">
                  <Border />
                </div>
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Spinner data-testid="search-spinner" className="size-8" />
                  </div>
                ) : isError ? (
                  <p role="alert" className="text-center text-red-500">
                    プロダクトの検索中にエラーが発生しました
                  </p>
                ) : (
                  <SearchResult
                    displayedProducts={displayedProducts}
                    searchProductsCount={searchProductsCount}
                    user={user}
                    votedProductIds={votedIds}
                    handleUpvoteSuccess={handleUpvoteSuccess}
                    onSearchModalClose={onSearchModalClose}
                    keyword={keyword}
                    categories={categories}
                    pricing_type={pricing_type}
                    order={order}
                    productCount={productCount}
                    handleSearch={handleSearch}
                    isViewAllLoading={isViewAllLoading}
                    isTakeAll={isTakeAll}
                    setIsTakeAll={setIsTakeAll}
                    isViewAllError={isViewAllError}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
