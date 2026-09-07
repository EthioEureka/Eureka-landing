"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      icon,
      iconPosition = "right",
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium font-sans rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-eureka-blue/50 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer select-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-gradient-to-r from-eureka-blue to-eureka-indigo text-white shadow-eureka-md hover:shadow-eureka-lg hover:from-eureka-blue-dark hover:to-eureka-indigo/90 border border-transparent",
      secondary:
        "bg-eureka-light text-eureka-dark hover:bg-slate-200 border border-eureka-border text-slate-800 hover:text-eureka-dark",
      outline:
        "bg-transparent text-eureka-dark border border-eureka-border hover:border-eureka-blue hover:text-eureka-blue hover:bg-blue-50/50",
      ghost:
        "bg-transparent text-eureka-slate hover:text-eureka-blue hover:bg-slate-100/70 border border-transparent",
      danger:
        "bg-red-600 text-white hover:bg-red-700 shadow-sm border border-transparent focus:ring-red-500/50",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-2 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === "right" && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";
export default CustomButton;
