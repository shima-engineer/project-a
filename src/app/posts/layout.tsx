import { Toaster } from "sonner";

const PostsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position="top-center" richColors />
    </>
  );
};

export default PostsLayout;
