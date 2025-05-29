
import React from "react";
import { ErrorMessage } from "./ErrorMessage";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { RememberMeOption } from "./RememberMeOption";
import { LoginButton } from "./LoginButton";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  loading: boolean;
  error: string;
  handleLogin: (e: React.FormEvent) => void;
}

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  loading,
  error,
  handleLogin,
}: LoginFormProps) => {
  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 sm:space-y-6"
    >
      <ErrorMessage error={error} />
      
      <div className="opacity-0 translate-y-2 animate-[fade-in_0.5s_ease-out_0.2s_forwards]">
        <EmailField email={email} setEmail={setEmail} />
      </div>
      
      <div className="opacity-0 translate-y-2 animate-[fade-in_0.5s_ease-out_0.3s_forwards]">
        <PasswordField
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </div>
      
      <div className="flex items-center justify-between mt-2 opacity-0 translate-y-2 animate-[fade-in_0.5s_ease-out_0.4s_forwards]">
        <RememberMeOption rememberMe={rememberMe} setRememberMe={setRememberMe} />
      </div>
      
      <div className="opacity-0 translate-y-2 animate-[fade-in_0.5s_ease-out_0.5s_forwards]">
        <LoginButton loading={loading} />
      </div>
    </form>
  );
};
