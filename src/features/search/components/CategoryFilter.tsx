import CATEGORIES from "../constants";

const CategoryFilter = () => {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold text-muted-foreground">
        カテゴリー
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CATEGORIES.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="inline-flex items-center whitespace-nowrap cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-sm py-2 h-11 justify-start gap-2 rounded-md border-border bg-background px-3 text-xs font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary sm:text-sm"
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;
