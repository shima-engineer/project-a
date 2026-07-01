import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const LoginDialog = () => {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-5 bg-slate-100 p-1 rounded-lg h-auto">
        <TabsTrigger
          value="login"
          className=" text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm text-slate-500 data-[state=active]:text-slate-900 rounded-md hover:cursor-pointer"
        >
          ログイン
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className=" text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm text-slate-500 data-[state=active]:text-slate-900 rounded-md hover:cursor-pointer"
        >
          新規登録
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login" className="mt-0">
        <LoginForm />
      </TabsContent>

      <TabsContent value="signup" className="mt-0">
        <SignupForm />
      </TabsContent>
    </Tabs>
  );
};

export default LoginDialog;
