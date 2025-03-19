
import { useState, useEffect } from "react";
import { LoginForm } from "./auth/LoginForm";
import { LoadingScreen } from "./LoadingScreen";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      setAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  // If still loading, show the loading screen
  if (loading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // If not authenticated, show the login form
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/90 p-4">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // If authenticated, show the main content
  return <>{children}</>;
};
