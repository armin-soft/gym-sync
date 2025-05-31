
import { motion } from "framer-motion";

export const BackgroundDecorations = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl" />
    </div>
  );
};
