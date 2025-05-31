
import { motion } from "framer-motion";
import { LogIn, ArrowLeft } from "lucide-react";

interface ModernLoginButtonProps {
  loading: boolean;
}

export const ModernLoginButton = ({ loading }: ModernLoginButtonProps) => {
  return (
    <motion.button 
      type="submit" 
      className="group relative w-full h-12 overflow-hidden rounded-xl font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-700"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2 h-full text-white">
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>در حال ورود...</span>
          </>
        ) : (
          <>
            <span>ورود به سیستم</span>
            <motion.div
              className="flex items-center"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ArrowLeft className="h-4 w-4" />
            </motion.div>
          </>
        )}
      </div>
      
      {/* Shine effect */}
      {!loading && (
        <motion.div
          className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      )}
      
      {/* Border glow */}
      <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-colors"></div>
    </motion.button>
  );
};
