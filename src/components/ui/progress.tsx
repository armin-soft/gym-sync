
import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  indicatorColor?: string
  showValue?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "gradient"
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, indicatorColor, showValue = false, size = "md", variant = "default", ...props }, ref) => {
    const percentage = value ? Math.round((value / max) * 100) : 0
    
    const sizeClasses = {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3",
    }
    
    return (
      <div className="relative w-full">
        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-primary/10 rtl:rotate-180",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "h-full w-full flex-1 transition-all duration-300 ease-in-out",
              variant === "gradient" 
                ? "bg-gradient-to-r from-indigo-500 to-purple-600" 
                : "bg-primary",
              indicatorColor
            )}
            style={{
              transform: `translateX(${100 - percentage}%)`,
            }}
          />
        </div>
        {showValue && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white z-10">
            {percentage}%
          </span>
        )}
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
