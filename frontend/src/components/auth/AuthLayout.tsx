import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-brand-black">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/images/auth-bg.jpg')" }}>
          <div className="absolute inset-0 w-full h-full bg-black/50" />
        </div>
        <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-black/70 rounded-lg">
          {children}
        </div>
      </div>
    );
  };
  
  export default AuthLayout;
  