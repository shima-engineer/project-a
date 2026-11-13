import SearchResultItem from "./SearchResultItem";
import { SearchedProducts } from "../queries/searchProducts";
import type { Users } from "@/features/auth/queries/getCurrentUser";

interface SearchResultListProps {
  searchedProducts: SearchedProducts;
  votedProductIds: Set<string>;
  user: Users;
  handleUpvoteSuccess: (productId: string, voted: boolean) => void;
  onSearchModalClose: () => void;
}

const SearchResultList = ({
  searchedProducts,
  votedProductIds,
  user,
  handleUpvoteSuccess,
  onSearchModalClose,
}: SearchResultListProps) => {
  return (
    <ul className="flex flex-col gap-4">
      {searchedProducts.map((product) => (
        <SearchResultItem
          key={product.id}
          product={product}
          votedProductIds={votedProductIds}
          user={user}
          handleUpvoteSuccess={handleUpvoteSuccess}
          onSearchModalClose={onSearchModalClose}
        />
      ))}
    </ul>
  );
};

export default SearchResultList;
