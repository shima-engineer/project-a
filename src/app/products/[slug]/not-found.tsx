import Link from "next/link";

// TODO#16: 存在しないslugの場合、notFound()で呼び出す
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">Product Not Found</h1>
      <Link className="bg-primary text-white px-4 py-2 rounded" href="/">
        ホームへ戻る
      </Link>
    </div>
  );
};

export default NotFound;
