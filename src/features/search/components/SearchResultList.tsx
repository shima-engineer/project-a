import SearchResultItem from "./SearchResultItem";
import { SearchedProducts } from "../queries/searchProducts";
import type { Users } from "@/features/auth/queries/getCurrentUser";
const SearchResultList = ({
  searchedProducts,
   votedProductIds,
  user,
  handleUpvoteSuccess,
}: {
  searchedProducts: SearchedProducts;
   votedProductIds: Set<string>;
  user: Users;
  handleUpvoteSuccess: (productId: string, voted: boolean) => void;
}) => {
  return (
    <ul className="flex flex-col gap-4">
      {searchedProducts.map((product) => (
        <SearchResultItem key={product.id} product={product}  votedProductIds={ votedProductIds} user={user} handleUpvoteSuccess={handleUpvoteSuccess} />
      ))}
    </ul>
  );
};

export default SearchResultList;
