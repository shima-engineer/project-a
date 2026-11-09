import { PRICING_PLANS } from "../constants";

const PricingFilter = () => {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-semibold text-muted-foreground">
        料金プラン
      </legend>
      <div className="flex flex-wrap gap-2">
        {PRICING_PLANS.map((plan) => (
          <label key={plan.label} className="cursor-pointer">
            <input
              type="checkbox"
              name="pricing"
              value={plan.label}
              className="peer sr-only"
            />
            <span className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary peer-checked:border-primary peer-checked:bg-primary/10 peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
              {plan.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default PricingFilter;
