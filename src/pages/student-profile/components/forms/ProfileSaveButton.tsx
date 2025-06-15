
import React from "react";
import { motion } from "framer-motion";
import { Save, Loader } from "lucide-react";

interface ProfileSaveButtonProps {
  onSave: () => void;
  isLoading: boolean;
}

export const ProfileSaveButton: React.FC<ProfileSaveButtonProps> = ({
  onSave,
  isLoading
}) => {
  return (
    <div className="flex justify-end">
      <motion.button
        onClick={onSave}
        disabled={isLoading}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-semibold rounded-2xl shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isLoading ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Save className="w-5 h-5" />
        )}
        <span>
          {isLoading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
        </span>
      </motion.button>
    </div>
  );
};
