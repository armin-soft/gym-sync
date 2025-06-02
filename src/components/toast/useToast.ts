
import { useCallback } from "react";
import { ToastType, ToastVariant } from "./types";
import { useToastContext } from "./ToastProvider";

const generateId = () => Math.random().toString(36).substring(2, 9);

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useToast = () => {
  const { dispatch } = useToastContext();

  const toast = useCallback((options: ToastOptions) => {
    const id = generateId();
    const toastData: ToastType = {
      id,
      ...options,
      open: true,
    };

    dispatch({ type: "ADD_TOAST", toast: toastData });

    return {
      id,
      dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
      update: (newOptions: Partial<ToastOptions>) =>
        dispatch({ type: "UPDATE_TOAST", toast: { id, ...newOptions } }),
    };
  }, [dispatch]);

  const successToast = useCallback((title: string, description?: string) => {
    return toast({ title, description, variant: "success" });
  }, [toast]);

  const errorToast = useCallback((title: string, description?: string) => {
    return toast({ title, description, variant: "error" });
  }, [toast]);

  const warningToast = useCallback((title: string, description?: string) => {
    return toast({ title, description, variant: "warning" });
  }, [toast]);

  const infoToast = useCallback((title: string, description?: string) => {
    return toast({ title, description, variant: "info" });
  }, [toast]);

  const dismiss = useCallback((toastId?: string) => {
    dispatch({ type: "DISMISS_TOAST", toastId });
  }, [dispatch]);

  return {
    toast,
    successToast,
    errorToast,
    warningToast,
    infoToast,
    dismiss,
  };
};
