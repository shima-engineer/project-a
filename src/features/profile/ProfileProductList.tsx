import ProfileProductItem from "./ProfileProductItem";
import { getProductsById } from "./queries/geProductsById";

const ProfileProductList = async ({ userId }: { userId: string }) => {
  console.log(userId);
  const products = await getProductsById(userId);
  console.log(products);
  return (
    <section>
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-base font-semibold ">投稿プロダクト</h2>
        <p className="text-sm font-normal text-muted-foreground tabular-nums">
          {products.length}件
        </p>
      </div>
      <ul className="md:grid md:grid-cols-2">
        {products.map((product) => (
          <ProfileProductItem key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
};

export default ProfileProductList;
