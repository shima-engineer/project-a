const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <p className="text-xs text-error">{errorMessage}</p>;
};

export default ErrorMessage;
