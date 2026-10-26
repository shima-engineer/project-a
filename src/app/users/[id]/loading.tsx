import { Spinner } from "@/components/ui/spinner";

const loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
};

export default loading;
