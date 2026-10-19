const ErrorMessage = ({ errorMessage }: { errorMessage?: string }) => {
  if (!errorMessage) return null;

  return <p className="text-xs text-error">{errorMessage}</p>;
};

export default ErrorMessage;
