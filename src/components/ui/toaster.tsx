
import { useToast } from "@/hooks/use-toast"
import { ToastProvider } from "@/components/ui/toast"
import { ToastContainer } from "./toast/toast-container"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      <ToastContainer toasts={toasts} />
    </ToastProvider>
  )
}
