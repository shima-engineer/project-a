import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "./schemas/loginSchema";

const LoginForm = () => {
  // React Hook Formの初期化
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 送信処理
  const onSubmit = async (data: LoginFormValues) => {
    setSubmitStatus("submitting");

    try {
      // API呼び出し処理...
      setSubmitStatus("success");
      reset(); // フォームリセット
    } catch (error) {
      setSubmitStatus("error");
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 text-left">
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
        ログイン
      </button>
    </form>
  );
};

export default LoginForm;
