import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}

const Button = ({ children, onClick, type = 'button', disabled = false, fullWidth = false, variant = 'primary' }: ButtonProps) => {
    const baseClasses = `py-3 px-6 font-bold rounded transition-colors disabled:opacity-50`;
  
    const variants = {
      primary: 'bg-brand-red text-white hover:bg-red-700',
      secondary: 'bg-gray-500/50 text-white hover:bg-gray-500/70',
    };
  
    const widthClass = fullWidth ? 'w-full' : '';
  
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]} ${widthClass}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;