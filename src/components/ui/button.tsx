
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "brand-bg-primary text-white hover:bg-orange-600 shadow-sm border border-orange-500/20 hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm border border-destructive/20 hover:shadow-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "brand-bg-secondary brand-text-dark hover:bg-gold-600 shadow-sm border border-gold-500/20 hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "brand-text-primary underline-offset-4 hover:underline",
        gradient: "brand-gradient hover:from-orange-600 hover:to-gold-600 text-white shadow-sm hover:shadow-md border border-orange-500/10",
        success: "bg-success-500 text-white hover:bg-success-600 shadow-sm border border-success-500/20 hover:shadow-md",
        warning: "brand-bg-secondary brand-text-dark hover:bg-gold-600 shadow-sm border border-gold-500/20 hover:shadow-md",
        info: "bg-info-500 text-white hover:bg-info-600 shadow-sm border border-info-500/20 hover:shadow-md",
        black: "brand-bg-dark text-white hover:bg-black-800 shadow-sm border border-black-700/20 hover:shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
