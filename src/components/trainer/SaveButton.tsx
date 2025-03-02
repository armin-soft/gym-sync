
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { motion } from "framer-motion";

interface SaveButtonProps {
  onSave: () => void;
}

export const SaveButton = ({ onSave }: SaveButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="pt-6 mt-6 border-t"
    >
      <Button 
        onClick={onSave} 
        className="w-full group relative overflow-hidden"
        size="lg"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative flex items-center justify-center">
          <Save className="ml-2 h-4 w-4 transition-transform group-hover:rotate-[-10deg]" />
          ذخیره تغییرات
        </span>
      </Button>
    </motion.div>
  );
};
