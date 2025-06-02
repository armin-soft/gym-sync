
import React from "react";
import { ToastProvider, ToastContainer } from "@/components/toast";

export function Toaster() {
  return (
    <ToastProvider>
      <ToastContainer />
    </ToastProvider>
  );
}
