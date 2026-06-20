"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import GoogleAuthButton from "../auth/GoogleAuthButton";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* 
        shadcnのDialogContentは自動的に背景のダークアウトや
        右上の一角にある「閉じるボタン（✕）」、Escキー制御を処理してくれます。
      */}
      <DialogContent className="sm:max-w-md p-8 rounded-xl bg-white text-slate-800 border-none gap-0">
        {/* ヘッダー情報 */}
        <div className="mb-6 text-left">
          <DialogTitle className="text-xl font-bold text-slate-900">
            ProductJPへようこそ
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-slate-500 leading-relaxed">
            アップボート、コメント、プロダクト投稿にはログインが必要です。
          </DialogDescription>
        </div>

          <GoogleAuthButton />

        {/* 区切り線 */}
        <div className="relative mb-6 text-center text-xs text-slate-400">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-3">または</span>
        </div>

        {/* shadcnのTabsによる「ログイン」「新規登録」の切り替え */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-5 bg-slate-100 p-1 rounded-lg h-auto">
            <TabsTrigger
              value="login"
              className="py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm text-slate-500 data-[state=active]:text-slate-900 rounded-md"
            >
              ログイン
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm text-slate-500 data-[state=active]:text-slate-900 rounded-md"
            >
              新規登録
            </TabsTrigger>
          </TabsList>

          {/* 各タブの中身（フォーム共通のためコンポーネント化してもOK） */}
          {["login", "signup"].map((type) => (
            <TabsContent key={type} value={type} className="mt-0">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-4 text-left"
              >
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    パスワード
                  </label>
                  <input
                    type="password"
                    placeholder="6文字以上"
                    className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-lg bg-[#4f46e5] py-3 text-sm font-semibold text-white hover:bg-[#4338ca] transition shadow-md shadow-indigo-100"
                >
                  {type === "login" ? "ログイン" : "新規登録"}
                </button>
              </form>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
