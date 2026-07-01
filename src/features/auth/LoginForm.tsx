"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "./schemas/loginSchema";
import { toast } from "sonner";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (data: LoginFormValues) => {
    setLoading(true);

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error(error.message);
        toast.error("メールアドレスまたはパスワードが正しくありません。");
        return;
      }

      toast.success("ログインに成功しました。");
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleLoginSubmit)}
      className="space-y-4 text-left"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-slate-700 mb-2"
        >
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none transition mb-1"
          {...register("email")}
        />
        <p className="text-error text-xs">{errors.email?.message}</p>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold text-slate-700 mb-2"
        >
          パスワード
        </label>
        <input
          type="password"
          id="password"
          placeholder="6文字以上"
          className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none transition mb-1"
          {...register("password")}
        />
        <p className="text-error text-xs">{errors.password?.message}</p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-lg bg-[#4f46e5] py-3 text-sm font-semibold text-white hover:bg-[#4338ca] transition shadow-md shadow-indigo-100 hover:cursor-pointer"
      >
        {loading ? "ログイン中..." : "ログイン"}
      </button>
    </form>
  );
};

export default LoginForm;
