
import { ReactNode } from "react";

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  // حذف کامل سیستم احراز هویت - فقط نمایش محتوای اصلی
  return <>{children}</>;
};
