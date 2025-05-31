
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export const ProfileBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="absolute -bottom-2 -right-1"
    >
      <Badge className="bg-gradient-to-r from-orange-500 to-gold-500 border-none text-black px-2 py-0.5 text-xs">
        مربی
      </Badge>
    </motion.div>
  );
};
