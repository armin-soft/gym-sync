
import { motion } from "framer-motion";
import { ErrorMessage } from "./ErrorMessage";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { RememberMeOption } from "./RememberMeOption";
import { LoginButton } from "./LoginButton";
import { containerVariants, itemVariants } from "./AnimationVariants";

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
    <motion.form
      onSubmit={handleLogin}
      className="space-y-4 sm:space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ErrorMessage error={error} />
      
      <motion.div variants={itemVariants}>
        <EmailField email={email} setEmail={setEmail} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <PasswordField
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
      </motion.div>
      
      <motion.div 
        className="flex items-center justify-between mt-2"
        variants={itemVariants}
      >
        <RememberMeOption rememberMe={rememberMe} setRememberMe={setRememberMe} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <LoginButton loading={loading} />
      </motion.div>
    </motion.form>
  );
};
