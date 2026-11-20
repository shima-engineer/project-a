import { PRICING_PLANS } from "../constants";

const PricingFilter = ({
  pricing_type,
  onPricingChange,
}: {
  pricing_type: string[];
  onPricingChange: (nextPricings: string[]) => void;
}) => {
  /**
   * 料金プラン変更時に料金プランの配列を更新し、親コンポーネントに通知する
   *
   * @param event 入力イベント
   */
  const handlePricingChange = (label: string) => {
    const nextPricings = pricing_type.includes(label)
      ? pricing_type.filter((item) => item !== label)
      : [...pricing_type, label];

    onPricingChange(nextPricings);
  };
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
              onClick={() => handlePricingChange(plan.label)}
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
