
import { motion } from "framer-motion";
import { Lock, AlertTriangle, Ban } from "lucide-react";

export const LockIcon = () => {
  return (
    <div className="relative mx-auto mb-6 w-20 h-20 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl opacity-90 blur-sm"></div>
      <div className="relative bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-4 shadow-2xl">
        <Lock className="h-12 w-12 text-white" />
      </div>
      
      {/* Warning badge */}
      <motion.div
        className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AlertTriangle className="h-3 w-3 text-white" />
      </motion.div>

      {/* Security badge */}
      <motion.div
        className="absolute -bottom-1 -left-1 bg-orange-500 rounded-full p-1"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Ban className="h-3 w-3 text-white" />
      </motion.div>
    </div>
  );
};
