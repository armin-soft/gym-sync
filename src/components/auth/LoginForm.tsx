
// Import the new main LoginForm component from the login folder
import { LoginForm as LoginFormComponent } from "./login/LoginFormWrapper";

// Re-export the component with the same name for backward compatibility
export const LoginForm = LoginFormComponent;
