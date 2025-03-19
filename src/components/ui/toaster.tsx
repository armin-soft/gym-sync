
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts } = useToast()

  // Function to get the appropriate icon based on toast variant
  const getToastIcon = (variant: string | undefined) => {
    switch (variant) {
      case "destructive":
        return <XCircle className="h-5 w-5 text-destructive" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props}
            className={cn(
              "group backdrop-blur-md border border-border/30 shadow-lg",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[swipe=end]:animate-out data-[state=closed]:fade-out-80",
              "persian-numbers rounded-xl flex items-start gap-3 p-4",
              variant === "destructive" && "bg-destructive/10 border-destructive/20",
              variant === "success" && "bg-emerald-500/10 border-emerald-500/20",
              variant === "warning" && "bg-amber-500/10 border-amber-500/20",
              !variant && "bg-background/80 border-border/30"
            )}
          >
            <div className="shrink-0 pt-0.5">
              {getToastIcon(variant)}
            </div>
            <div className="grid gap-1 flex-1 text-right">
              {title && (
                <ToastTitle className={cn(
                  "text-base font-semibold",
                  variant === "destructive" && "text-destructive",
                  variant === "success" && "text-emerald-600",
                  variant === "warning" && "text-amber-600"
                )}>
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-sm opacity-90">
                  {description}
                </ToastDescription>
              )}
              {action}
            </div>
            <ToastClose className="absolute left-2 top-2 rounded-md p-1 text-foreground/50 opacity-100 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100" />
          </Toast>
        )
      })}
      <ToastViewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-md sm:items-center" />
    </ToastProvider>
  )
}
