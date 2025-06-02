
// Re-export from the new toast system for compatibility
export { useToast } from "@/components/toast";
export type { ToastType as Toast, ToastVariant } from "@/components/toast/types";

// Legacy exports for backward compatibility
export const toast = (options: any) => {
  console.warn("Direct toast() function is deprecated. Use useToast() hook instead.");
};

export const successToast = (title: string, description?: string) => {
  console.warn("Direct successToast() function is deprecated. Use useToast() hook instead.");
};

export const errorToast = (title: string, description?: string) => {
  console.warn("Direct errorToast() function is deprecated. Use useToast() hook instead.");
};

export const warningToast = (title: string, description?: string) => {
  console.warn("Direct warningToast() function is deprecated. Use useToast() hook instead.");
};

export const infoToast = (title: string, description?: string) => {
  console.warn("Direct infoToast() function is deprecated. Use useToast() hook instead.");
};
