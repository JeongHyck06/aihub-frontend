import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type SharedButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type NativeButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type AnchorButtonProps = SharedButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = NativeButtonProps | AnchorButtonProps;

function splitAnchorProps({
  children,
  className,
  variant,
  size,
  ...anchorProps
}: AnchorButtonProps) {
  void children;
  void className;
  void variant;
  void size;

  return anchorProps;
}

function splitNativeButtonProps({
  children,
  className,
  variant,
  size,
  ...buttonProps
}: NativeButtonProps) {
  void children;
  void className;
  void variant;
  void size;

  return buttonProps;
}

function isAnchorButtonProps(props: ButtonProps): props is AnchorButtonProps {
  return typeof props.href === "string";
}

const variantClassName: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
  secondary:
    "bg-blue-50 text-blue-600 hover:bg-blue-100 focus-visible:ring-blue-600",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-500",
};

const sizeClassName: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-[15px]",
  lg: "h-12 px-8 text-base",
};

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
  } = props;
  const baseClassName = cn(
    "inline-flex items-center justify-center rounded-full font-extrabold transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClassName[variant],
    sizeClassName[size],
    className,
  );

  if (isAnchorButtonProps(props)) {
    const anchorProps = splitAnchorProps(props);

    return (
      <a className={baseClassName} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = splitNativeButtonProps(props);

  return (
    <button className={baseClassName} {...buttonProps}>
      {children}
    </button>
  );
}
