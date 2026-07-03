"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "./schemas/signupSchema";
import { toast } from "sonner";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUpSubmit = async (data: SignupFormValues) => {
    setLoading(true);

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            display_name: data.displayName,
          },
        },
      });

      if (error) {
        console.error(error.message);
        toast.error("エラーが発生しました。もう一度お試しください。");
        return;
      }

      toast.success("認証メールを送信しました。メールをご確認ください。");
    } catch (error) {
      console.error(error);
      toast.error("エラーが発生しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignUpSubmit)}
      className="space-y-4 text-left"
    >
      <div>
        <label
          htmlFor="displayName"
          className="block text-xs font-semibold text-slate-700 mb-2"
        >
          表示名
        </label>
        <input
          id="displayName"
          type="text"
          placeholder="山田 太郎"
          className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none transition mb-1"
          {...register("displayName")}
        />
        <p className="text-red-500 text-xs">{errors.displayName?.message}</p>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-slate-700 mb-2"
        >
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className=" w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none transition mb-1"
          {...register("email")}
        />
        <p className="text-red-500 text-xs">{errors.email?.message}</p>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold text-slate-700 mb-2"
        >
          パスワード
        </label>
        <input
          id="password"
          type="password"
          placeholder="6文字以上"
          className="w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none transition mb-1"
          {...register("password")}
        />
        <p className="text-red-500 text-xs">{errors.password?.message}</p>
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-xs font-semibold text-slate-700 mb-2"
        >
          確認パスワード
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="6文字以上"
          className=" w-full rounded-lg border border-slate-200 p-2.5 text-sm focus:border-blue-500 focus:outline-none transition mb-1"
          {...register("confirmPassword")}
        />
        <p className="text-red-500 text-xs">
          {errors.confirmPassword?.message}
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full rounded-lg bg-[#4f46e5] py-3 text-sm font-semibold text-white hover:bg-[#4338ca] transition shadow-md shadow-indigo-100 cursor-pointer"
      >
        {loading ? "登録中..." : "新規登録"}
      </button>
    </form>
  );
};

export default SignupForm;
