import CATEGORIES from "../constants";

const CategoryFilter = () => {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold text-muted-foreground">
        カテゴリー
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CATEGORIES.map(({ label, icon: Icon }) => (
          <label key={label} className="cursor-pointer">
            <input
              type="checkbox"
              name="category"
              value={label}
              className="peer sr-only"
            />
            <span className="flex items-center gap-2 rounded-md border p-3 transition-colors peer-checked:border-primary peer-checked:bg-primary/10 peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;
