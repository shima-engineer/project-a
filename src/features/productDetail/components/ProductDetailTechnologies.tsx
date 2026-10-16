import type { ProductDetails } from "../queries/getProductDetails";

const ProductDetailTechnologies = ({
  productDetails,
}: {
  productDetails: ProductDetails;
}) => {
  return (
    <section>
      <h3 className="text-base font-semibold mt-6 mb-2">技術スタック</h3>
      <div className="flex flex-wrap gap-2">
        {productDetails?.product_tech_stacks.map(({ tech_stacks: tech }) => (
          <span
            key={tech.id}
            className="rounded-md bg-secondary px-2 py-1 text-xs font-mono"
          >
            {tech.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default ProductDetailTechnologies;
