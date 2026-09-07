"use client";

interface InputLabelProps {
  children: React.ReactNode;
  required?: boolean;
}

/**
 * Label nhỏ dùng chung cho FormInput và FormTextarea.
 * Hiển thị dấu * đỏ khi required=true.
 */
export default function InputLabel({ children, required = false }: InputLabelProps) {
  return (
    <label className="text-sm font-semibold text-gray-800">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
