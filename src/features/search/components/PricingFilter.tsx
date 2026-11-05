import { PRICING_PLANS } from "../constants";

const PricingFilter = () => {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold text-muted-foreground">
        料金プラン
      </h2>
      <div className="flex flex-wrap gap-2">
        {PRICING_PLANS.map((plan) => (
          <button
            key={plan.label}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input shadow-sm h-8 px-3 text-xs rounded-md bg-background hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
          >
            {plan.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default PricingFilter;
