
import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  indicatorColor?: string
  showValue?: boolean
  size?: "sm" | "md" | "lg"
  animated?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, indicatorColor, showValue = false, size = "md", animated = false, ...props }, ref) => {
    const percentage = value ? Math.round((value / max) * 100) : 0;
    
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          "relative overflow-hidden rounded-full bg-primary/10",
          {
            "h-1.5": size === "sm",
            "h-2.5": size === "md",
            "h-3.5": size === "lg",
          },
          "w-full",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full flex-1 bg-primary transition-all",
            {
              "animate-pulse": animated && percentage < 100,
            },
            indicatorColor
          )}
          style={{
            transform: `translateX(${value ? 100 - percentage : 100}%)`,
          }}
        />
        
        {showValue && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white">
            {percentage}%
          </span>
        )}
      </div>
    )
  }
)
Progress.displayName = "Progress"

export { Progress }
