import SearchResultList from "./SearchResultList";
import { ArrowRight } from "lucide-react";
import type { Users } from "@/features/auth/queries/getCurrentUser";
import type { SearchedProducts } from "../queries/searchProducts";
import type { SearchParams } from "../types";
import { Search } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { RefreshCw } from "lucide-react";

interface SearchResultProps {
  displayedProducts: SearchedProducts;
  searchProductsCount: number;
  votedProductIds: Set<string>;
  user: Users;
  handleUpvoteSuccess: (productId: string, voted: boolean) => void;
  onSearchModalClose: () => void;
  keyword: string;
  categories: string[];
  pricing_type: string[];
  order: string;
  productCount: number;
  handleSearch: (params: SearchParams) => void;
  isViewAllLoading: boolean;
  isTakeAll: boolean;
  setIsTakeAll: (isTakeAll: boolean) => void;
  isViewAllError: boolean;
}

const SearchResult = ({
  displayedProducts,
  searchProductsCount,
  votedProductIds,
  user,
  handleUpvoteSuccess,
  onSearchModalClose,
  keyword,
  categories,
  pricing_type,
  order,
  productCount,
  handleSearch,
  isViewAllLoading,
  isTakeAll,
  setIsTakeAll,
  isViewAllError,
}: SearchResultProps) => {
  return (
    <section className="pr-6 pl-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xs font-semibold text-muted-foreground">
          検索結果
        </h2>
        <span className="text-xs text-muted-foreground">
          {searchProductsCount}件
        </span>
      </div>
      <div className="mb-4">
        {displayedProducts.length === 0 && (
          <div className="px-4 py-14 text-center">
            <Search className="mx-auto mb-4 size-8" />
            <p>該当するプロダクトが見つかりませんでした</p>
          </div>
        )}
        <SearchResultList
          displayedProducts={displayedProducts}
          votedProductIds={votedProductIds}
          user={user}
          handleUpvoteSuccess={handleUpvoteSuccess}
          onSearchModalClose={onSearchModalClose}
        />
      </div>
      {isViewAllLoading ? (
        <div className="flex justify-center items-center gap-2">
          <Spinner data-testid="search-spinner" className="size-8" />
          <p className="text-xs text-muted-foreground">
            すべての検索結果を読み込み中...
          </p>
        </div>
      ) : isViewAllError ? (
        <div className="text-center text-destructive">
          <p className="mb-2">すべての検索結果の読み込みに失敗しました</p>
          <button
            onClick={() =>
              handleSearch({
                keyword,
                categories,
                pricing_type,
                order,
                takeAll: true,
              })
            }
            className="border rounded-md px-2 py-1 flex gap-4 mx-auto items-center"
          >
            <RefreshCw size={16} />
            再実行する
          </button>
        </div>
      ) : productCount >= 6 && !isTakeAll ? (
        <button
          type="button"
          className="inline-flex items-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-9 w-full justify-between rounded-md text-sm text-primary hover:bg-primary/5"
          onClick={() =>
            handleSearch({
              keyword,
              categories,
              pricing_type,
              order,
              takeAll: true,
            })
          }
        >
          すべての検索結果を見る
          <ArrowRight aria-hidden="true" />
        </button>
      ) : isTakeAll ? (
        <button
          type="button"
          className="inline-flex items-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-9 w-full justify-between rounded-md text-sm text-primary hover:bg-primary/5"
          onClick={() => setIsTakeAll(false)}
        >
          5件のみ表示
          <ArrowRight aria-hidden="true" />
        </button>
      ) : null}
    </section>
  );
};

export default SearchResult;
