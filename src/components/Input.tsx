import React from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  id?: string;
  name: string;
  type: string;
  label?: string;
  className?: string;
  placeholder?: string;
  value: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  label,
  placeholder = "",
  value,
  onChange = () => {},
  className = "",
  required = false,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={4}
          className={twMerge(
            "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-600 shadow-sm focus:ring-primary focus:border-primary",
            className
          )}
          required={required}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={twMerge(
            "mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary",
            className
          )}
          required={required}
        />
      )}
    </div>
  );
};

export default Input;
