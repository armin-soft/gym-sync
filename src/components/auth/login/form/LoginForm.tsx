
import { motion } from "framer-motion";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";
import { RememberMeOption } from "./RememberMeOption";
import { ErrorMessage } from "./ErrorMessage";
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
  handleLogin
}: LoginFormProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <motion.form 
      onSubmit={handleLogin} 
      className="space-y-4 sm:space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} custom={0}>
        <EmailField email={email} setEmail={setEmail} />
      </motion.div>
      
      <motion.div variants={itemVariants} custom={1}>
        <PasswordField 
          password={password} 
          setPassword={setPassword} 
          showPassword={showPassword} 
          setShowPassword={setShowPassword} 
        />
      </motion.div>
      
      <motion.div variants={itemVariants} custom={2}>
        <RememberMeOption rememberMe={rememberMe} setRememberMe={setRememberMe} />
      </motion.div>
      
      <motion.div variants={itemVariants} custom={3}>
        <ErrorMessage error={error} />
      </motion.div>
      
      <motion.div 
        variants={itemVariants} 
        custom={4}
        className="pt-2"
      >
        <LoginButton loading={loading} />
      </motion.div>

      {/* تزئینات زیبای گرافیکی */}
      <div aria-hidden="true" className="pointer-events-none absolute left-5 bottom-5 w-24 h-24 bg-gradient-to-tr from-primary/10 to-indigo-500/20 rounded-full blur-2xl opacity-70" />
    </motion.form>
  );
};
