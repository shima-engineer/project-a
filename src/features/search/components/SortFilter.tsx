const SortFilter = () => {
  return (
    <div className="flex justify-between">
      <label
        htmlFor="sort-order"
        className="text-xs font-semibold text-muted-foreground"
      >
        並び順
      </label>
      <div>
        <select
          id="sort-order"
          name="sort"
          defaultValue="popular"
          className="border border-input shadow-sm h-8 px-3 text-xs rounded-md bg-background"
        >
          <option value="popular">人気順</option>
          <option value="newest">新着順</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilter;
