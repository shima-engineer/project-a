"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

const SignupForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            display_name: displayName,
          },
        },
      });

      if (error) {
        console.error(error.message);
        // toast.error(error.message);
        return;
      }

      console.log(data);
      // toast.success("認証メールを送信しました。メールをご確認ください。");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label className="text-xs font-semibold text-slate-700">表示名</label>
        <input
          type="text"
          placeholder="山田 太郎"
          className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none transition"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-700">
          メールアドレス
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          className="mt-1 w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-lg bg-[#4f46e5] py-3 text-sm font-semibold text-white hover:bg-[#4338ca] transition shadow-md shadow-indigo-100 hover:cursor-pointer"
      >
        {loading ? "登録中..." : "新規登録"}
      </button>
    </form>
  );
};

export default SignupForm;
