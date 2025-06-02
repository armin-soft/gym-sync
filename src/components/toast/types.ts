
import * as React from "react";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info" | "destructive";

export interface ToastType {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ToastState {
  toasts: ToastType[];
}

export type ToastAction =
  | { type: "ADD_TOAST"; toast: ToastType }
  | { type: "UPDATE_TOAST"; toast: Partial<ToastType> & { id: string } }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };
