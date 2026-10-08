const ProductDetailTechnologies = () => {
  return (
    <section>
      <h3 className="text-base font-semibold mt-6 mb-2">技術スタック</h3>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-md bg-secondary px-2 py-1 text-xs font-mono">
          Next.js
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-xs font-mono">
          OpenAI
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-xs font-mono">
          Supabase
        </span>
        <span className="rounded-md bg-secondary px-2 py-1 text-xs font-mono">
          Vercel
        </span>
      </div>
    </section>
  );
};

export default ProductDetailTechnologies;
