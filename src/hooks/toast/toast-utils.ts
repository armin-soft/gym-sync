
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

  // Set window.showToast for backwards compatibility
  if (typeof window !== 'undefined' && !window.showToast) {
    window.showToast = toast;
  }

  // Auto dismiss after TOAST_REMOVE_DELAY
  const duration = typeof props.duration === 'number' ? props.duration : 5000;
  setTimeout(() => {
    dismiss()
  }, duration - 100) // matches TOAST_REMOVE_DELAY - 100

  return {
    id,
    dismiss,
    update,
  }
}

// Standard toast variants
export const successToast = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "success",
  });
};

export const errorToast = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "destructive",
  });
};

export const warningToast = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "warning",
  });
};

export const infoToast = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "default",
  });
};

// Hook for toast functionality
export function useToast() {
  return {
    toast,
    successToast,
    errorToast,
    warningToast,
    infoToast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    toasts: [] // This will be populated from the context provider
  }
}
