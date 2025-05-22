
// Import the new main LoginForm component
import { LoginForm as LoginFormMain } from "./LoginFormMain";

interface LoginFormProps {
  onLoginSuccess: (rememberMe: boolean) => void;
}

// Simple wrapper to maintain backward compatibility
export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  return <LoginFormMain onLoginSuccess={onLoginSuccess} />;
};
