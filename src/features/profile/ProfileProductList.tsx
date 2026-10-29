import { User } from "@supabase/supabase-js";
import ProfileProductItem from "./ProfileProductItem";
import { getProductsById } from "./queries/geProductsById";
import { getUserUpvotes } from "../upvote/queries/getUserUpvotes";

const ProfileProductList = async ({
  currentUser,
  isOwner,
  userId,
}: {
  currentUser: User | null;
  isOwner: boolean;
  userId: string;
}) => {
  const products = await getProductsById(userId);
  const upvotes = currentUser ? await getUserUpvotes(currentUser.id) : [];
  // ログインしているユーザーが投票したプロダクトIDのセットを作成
  const votedProductIds = new Set(upvotes.map((u) => u.product_id));

  return (
    <section>
      <div className="flex items-baseline gap-2 mb-4">
        <h2 className="text-base font-semibold ">投稿プロダクト</h2>
        <p className="text-sm font-normal text-muted-foreground tabular-nums">
          {products.length > 0 ? products.length : 0}件
        </p>
      </div>
      <ul className="md:grid md:grid-cols-2">
        {products.map((product) => (
          <ProfileProductItem
            key={product.id}
            currentUser={currentUser}
            isOwner={isOwner}
            product={product}
            votedProductIds={votedProductIds}
          />
        ))}
      </ul>
    </section>
  );
};

export default ProfileProductList;
