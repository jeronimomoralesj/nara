import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "soft";
type ButtonSize = "default" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render the single child element instead of a <button> (e.g. a Link). */
  asChild?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-terracotta-500 text-white hover:bg-terracotta-600 shadow-sm hover:shadow-md hover:shadow-terracotta-500/20",
  secondary: "bg-charcoal text-white hover:bg-charcoal-soft shadow-sm",
  ghost: "bg-transparent text-charcoal hover:bg-charcoal/5 border border-charcoal/15",
  soft: "bg-terracotta-50 text-terracotta-700 hover:bg-terracotta-100",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-organic disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "default", asChild, children, ...props },
    ref
  ) => {
    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
