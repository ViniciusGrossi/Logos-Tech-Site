import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  shimmer?: boolean;
}

export function GradientText({
  children,
  className = "",
  shimmer = false,
}: GradientTextProps) {
  return (
    <span
      className={`text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-orange-400 ${
        shimmer ? "animate-shimmer bg-[length:200%_100%]" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}
