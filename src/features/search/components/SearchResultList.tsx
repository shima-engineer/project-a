import SearchResultItem from "./SearchResultItem";
import { SearchedProducts } from "../queries/searchProducts";
const SearchResultList = ({
  searchedProducts,
}: {
  searchedProducts: SearchedProducts;
}) => {
  return (
    <ul className="flex flex-col gap-4">
      {searchedProducts.map((product) => (
        <SearchResultItem key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default SearchResultList;
