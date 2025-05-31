
import { Button } from "@/components/ui/button";
import { Loader2, Save, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface SaveButtonProps {
  onSave: () => void;
  isLoading: boolean;
}

export const SaveButton = ({ onSave, isLoading }: SaveButtonProps) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    onSave();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        onClick={handleSave}
        disabled={isLoading}
        size="lg"
        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <motion.div 
          className="flex items-center gap-3"
          animate={isLoading ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>در حال ذخیره...</span>
            </>
          ) : showSuccess ? (
            <>
              <Check className="h-5 w-5" />
              <span>ذخیره شد!</span>
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              <span>ذخیره اطلاعات</span>
            </>
          )}
        </motion.div>
      </Button>
    </motion.div>
  );
};
