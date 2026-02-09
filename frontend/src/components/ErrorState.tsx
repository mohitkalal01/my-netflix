const ErrorState = ({ message }: { message: string }) => {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-500">{message || 'An unexpected error occurred.'}</p>
      </div>
    );
  };
  
  export default ErrorState;