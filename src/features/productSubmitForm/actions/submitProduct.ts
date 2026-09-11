import { ProductSubmitFormValues } from "../schema";
import { convertProductSubmitFormToData } from "../utils/convertProductSubmitFormToData";

export const submitProduct = async (data: ProductSubmitFormValues) => {
  const submitData = convertProductSubmitFormToData(data);

  console.log(submitData);

  // TODO:
  // 1. ログインユーザー取得
  // 2. カテゴリーID取得
  // 3. slug生成
  // 4. サムネイルアップロード
  // 5. スクリーンショットアップロード
  // 6. products作成
  // 7. tags作成・紐付け
  // 8. tech_stacks作成・紐付け
  // 9. 料金情報保存
};
