"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const baseStyles = "rounded-md font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a4037] focus-visible:ring-offset-2";
  
  const variantStyles = {
    primary: "bg-[#1a4037] text-white hover:bg-[#2d544c]",
    secondary: "bg-[#f59e0b] text-white hover:bg-[#d97706]",
    outline: "border border-[#1a4037] text-[#1a4037] hover:bg-[rgba(26,64,55,0.05)]",
  };
  
  const sizeStyles = {
    sm: "text-xs py-1.5 px-3",
    md: "text-sm py-2 px-4",
    lg: "text-base py-2.5 px-5",
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </motion.button>
  );
}