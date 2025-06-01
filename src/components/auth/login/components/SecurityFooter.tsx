
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export const SecurityFooter = () => {
  return (
    <>
      {/* Security Message */}
      <div className="flex items-center justify-center gap-2 text-white/60">
        <Shield className="h-4 w-4 text-blue-400" />
        <p className="text-sm">این محدودیت برای حفظ امنیت حساب شما اعمال شده است</p>
      </div>

      {/* Bottom decorative elements */}
      <div className="mt-8 flex justify-center gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-red-400/50 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </>
  );
};
