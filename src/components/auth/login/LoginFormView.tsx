
import { motion } from "framer-motion";
import { containerVariants } from "./form/AnimationVariants";
import { LoginHeader } from "./form/LoginHeader";
import { LoginForm } from "./form/LoginForm";

interface LoginFormViewProps {
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
  gymName: string;
}

export const LoginFormView = ({
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
  gymName
}: LoginFormViewProps) => {
  return (
    <>
      <div className="relative z-10 flex flex-col space-y-1.5 p-4 sm:p-6">
        <motion.div 
          className="flex flex-col items-center space-y-2"
          variants={containerVariants}
        >
          <LoginHeader gymName={gymName} />
        </motion.div>
      </div>
      
      <div className="relative z-10 p-4 sm:p-6 pt-2 sm:pt-6">
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          loading={loading}
          error={error}
          handleLogin={handleLogin}
        />
      </div>
    </>
  );
};
