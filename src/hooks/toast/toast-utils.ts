
import { Toast, ToastVariant } from "./toast-types";
import { dispatch, genId } from "./toast-reducer";

// Track the last notification to prevent duplicates
const toastHistory = new Map<string, number>();

// Toast function to show notifications
export function toast({ ...props }: { variant?: ToastVariant } & Toast) {
  const id = genId()
  
  // Create a unique key for this notification based on content
  const toastKey = `${props.title}-${props.description}`;
  const now = Date.now();
  
  // Check for duplicate notifications within a short time frame (1 second)
  if (toastHistory.has(toastKey)) {
    const lastShown = toastHistory.get(toastKey) || 0;
    if (now - lastShown < 1000) {
      // Skip showing duplicates
      return { id, dismiss: () => {}, update: () => {} };
    }
  }
  
  // Record this notification in history
  toastHistory.set(toastKey, now);
  
  // Clean up old notifications from history after 30 seconds
  setTimeout(() => {
    toastHistory.delete(toastKey);
  }, 30000);

  const update = (props: Toast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
    
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  // Auto dismiss after TOAST_REMOVE_DELAY
  setTimeout(() => {
    dismiss()
  }, 5000) // 5 seconds duration

  return {
    id,
    dismiss,
    update,
  }
}

// Hook for toast functionality
export function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    toasts: [] // This will be populated from the context provider
  }
}
