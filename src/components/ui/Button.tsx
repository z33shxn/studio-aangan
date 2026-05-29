import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/cn"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brass disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      primary: "bg-ink text-paper hover:bg-ink/90",
      secondary: "bg-bone text-ink hover:bg-stone-2/50",
      outline: "border border-ink/20 text-ink hover:bg-ink hover:text-paper",
      ghost: "hover:bg-bone text-ink",
    }
    
    const sizes = {
      sm: "h-9 px-4",
      md: "h-11 px-6",
      lg: "h-14 px-8 text-base",
    }

    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
