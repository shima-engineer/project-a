import SearchResultItem from "./SearchResultItem";

const SearchResultList = () => {
  return (
    <ul className="flex flex-col gap-4">
      <SearchResultItem />
      <SearchResultItem />
      <SearchResultItem />
    </ul>
  );
};

export default SearchResultList;
