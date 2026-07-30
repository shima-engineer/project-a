import { Button } from "@/components/ui/button";

const SubmitActionBar = () => {
  return (
    <div className="fixed bottom-0 left-0 flex justify-between items-center bg-background/90 gap-2 w-full z-10  border-t border-border px-4 sm:px-8 md:px-12 py-4 ">
      <span className="text-muted-foreground text-xs">
        TODO#13必須項目を入力してください
      </span>
      <div className="flex gap-2">
        <Button variant="outline" type="button">
          下書き保存
        </Button>
        <Button type="submit">投稿する</Button>
      </div>
    </div>
  );
};

export default SubmitActionBar;
