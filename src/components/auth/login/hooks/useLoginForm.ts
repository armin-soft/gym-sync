
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToastNotification } from "@/hooks/use-toast-notification";
import { z } from "zod";
import { useState } from "react";

// Form validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "ایمیل را وارد کنید" })
    .email({ message: "ایمیل نامعتبر است" }),
  password: z
    .string()
    .min(1, { message: "رمز عبور را وارد کنید" })
    .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const { showSuccess, showError } = useToastNotification();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsAuthenticating(true);
    setAuthError("");
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (data.email === "demo@example.com" && data.password === "password123") {
        showSuccess("ورود موفق", "خوش آمدید");
        // Handle successful login
        console.log("Login successful:", data);
      } else {
        setAuthError("ایمیل یا رمز عبور اشتباه است");
        showError("خطا در ورود", "ایمیل یا رمز عبور اشتباه است");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("مشکلی در ورود به سیستم پیش آمده است");
      showError("خطا در ورود", "مشکلی در ورود به سیستم پیش آمده است");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return {
    form,
    isAuthenticating,
    authError,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
