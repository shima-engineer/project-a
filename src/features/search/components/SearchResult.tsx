import SearchResultList from "./SearchResultList";
import { ArrowRight } from "lucide-react";
import type { Users } from "@/features/auth/queries/getCurrentUser";
import { SearchedProducts } from "../queries/searchProducts";
import { Search } from "lucide-react";

const SearchResult = ({
  searchedProducts,
  searchProductsCount,
  votedProductIds,
  user,
  handleUpvoteSuccess,
  onSearchModalClose,
}: {
  searchedProducts: SearchedProducts;
  searchProductsCount: number;
  votedProductIds: Set<string>;
  user: Users;
  handleUpvoteSuccess: (productId: string, voted: boolean) => void;
  onSearchModalClose: () => void;
}) => {
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
        {searchedProducts.length === 0 && (
          <div className="px-4 py-14 text-center">
            <Search className="mx-auto mb-4 size-8" />
            <p>該当するプロダクトが見つかりませんでした</p>
          </div>
        )}
        <SearchResultList
          searchedProducts={searchedProducts}
          votedProductIds={votedProductIds}
          user={user}
          handleUpvoteSuccess={handleUpvoteSuccess}
          onSearchModalClose={onSearchModalClose}
        />
      </div>
      {/* TODO76:検索結果が6件以上の場合のみ表示する */}
      <button
        type="button"
        className="inline-flex items-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-9 w-full justify-between rounded-md text-sm text-primary hover:bg-primary/5"
      >
        すべての検索結果を見る
        <ArrowRight aria-hidden="true" />
      </button>
    </section>
  );
};

export default SearchResult;
