
import React, { useEffect, useState } from "react";
import { AnimatePresence as FramerAnimatePresence } from "framer-motion";

interface AnimatePresenceProps {
  children: React.ReactNode;
  mode?: "sync" | "popLayout" | "wait";
  initial?: boolean;
  onExitComplete?: () => void;
}

export const AnimatePresence: React.FC<AnimatePresenceProps> = ({
  children,
  mode = "sync",
  initial = true,
  onExitComplete,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <FramerAnimatePresence mode={mode} initial={initial} onExitComplete={onExitComplete}>
      {children}
    </FramerAnimatePresence>
  );
};
