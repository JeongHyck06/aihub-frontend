import type { InputHTMLAttributes } from "react";

export type AuthFieldProps = {
  id: string;
  label: string;
  name: string;
  placeholder: string;
  type?: "email" | "password" | "text";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "placeholder" | "type">;

export function AuthField({
  id,
  label,
  name,
  placeholder,
  type = "text",
  ...props
}: AuthFieldProps) {
  return (
    <div>
      <label className="text-sm font-bold leading-5 text-[#384252]" htmlFor={id}>
        {label}
      </label>
      <input
        className="mt-1.5 h-14 w-full rounded-[14px] border border-[#e0e5f0] bg-white px-6 text-[15px] font-medium text-[#0d121a] placeholder:text-[#8c99ab] focus:outline-none focus:ring-2 focus:ring-blue-600"
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </div>
  );
}
