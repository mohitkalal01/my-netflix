import { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const Input = ({ type = 'text', name, placeholder, value, onChange, required = false }: InputProps) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-brand-red"
      />
    );
  };
  
  export default Input;