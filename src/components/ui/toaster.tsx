
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, AlertCircle, Bell } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const Icon = variant === "destructive" ? XCircle : 
                    variant === "success" ? CheckCircle2 : 
                    variant === "warning" ? AlertCircle : Bell

        return (
          <Toast key={id} {...props} variant={variant} className={cn(
            "data-[state=open]:slide-in-from-top-full",
            "dark:bg-zinc-950",
            "border-2",
          )}>
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-sm opacity-90">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="hover:opacity-100 transition-opacity" />
          </Toast>
        )
      })}
      <ToastViewport className="top-0 right-0 left-0 flex justify-center" />
    </ToastProvider>
  )
}
