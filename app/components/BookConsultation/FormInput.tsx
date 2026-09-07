"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import InputLabel from "./InputLabel";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  prefix?: ReactNode;
  error?: string;
}

export default function FormInput({
  label,
  required = false,
  prefix,
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <InputLabel required={required}>{label}</InputLabel>
      <div
        className={`flex items-center border rounded-lg overflow-hidden transition-all focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-indigo-400 ${
          error ? "border-red-400" : "border-gray-200"
        } bg-white`}
      >
        {prefix && (
          <div className="flex items-center px-3 py-2.5 border-r border-gray-200 bg-gray-50 shrink-0">
            {prefix}
          </div>
        )}
        <input
          className={`flex-1 px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none bg-transparent ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

