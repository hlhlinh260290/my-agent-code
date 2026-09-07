"use client";

import { TextareaHTMLAttributes } from "react";
import InputLabel from "./InputLabel";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export default function FormTextarea({
  label,
  required = false,
  error,
  className = "",
  ...props
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <InputLabel required={required}>{label}</InputLabel>
      <textarea
        className={`w-full px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 border rounded-lg outline-none resize-none transition-all focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white ${
          error ? "border-red-400" : "border-gray-200"
        } ${className}`}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
