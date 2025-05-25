
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FlaskConical, Pill, Plus, Sparkles, ShoppingBag } from 'lucide-react';

interface SupplementEmptyStateProps {
  activeTab: 'supplement' | 'vitamin';
  onAddSupplement: () => void;
}

export const SupplementEmptyState: React.FC<SupplementEmptyStateProps> = ({
  activeTab,
  onAddSupplement
}) => {
  const Icon = activeTab === 'supplement' ? FlaskConical : Pill;
  const colors = activeTab === 'supplement' 
    ? { from: 'from-purple-500', to: 'to-indigo-600', bg: 'bg-purple-100' }
    : { from: 'from-blue-500', to: 'to-purple-600', bg: 'bg-blue-100' };

  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center" dir="rtl">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-2xl"
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {/* Icon container */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className={`relative mb-6 mx-auto w-24 h-24 bg-gradient-to-br ${colors.from} ${colors.to} rounded-3xl shadow-2xl flex items-center justify-center`}
        >
          <Icon className="h-12 w-12 text-white" />
          
          {/* Floating sparkles */}
          <motion.div
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="h-6 w-6 text-yellow-400" />
          </motion.div>
          
          <motion.div
            animate={{
              scale: [1, 0, 1],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1
            }}
            className="absolute -bottom-1 -left-2"
          >
            <Sparkles className="h-4 w-4 text-pink-400" />
          </motion.div>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            هیچ {activeTab === 'supplement' ? 'مکملی' : 'ویتامینی'} وجود ندارد
          </h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            شروع کنید و اولین {activeTab === 'supplement' ? 'مکمل ورزشی' : 'ویتامین'} خود را به مجموعه اضافه کنید. 
            مدیریت سلامت و تغذیه شما از اینجا آغاز می‌شود!
          </p>
        </motion.div>

        {/* Action button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onAddSupplement}
            size="lg"
            className={`gap-3 text-white shadow-2xl font-bold rounded-2xl px-8 py-4 bg-gradient-to-r ${colors.from} ${colors.to} hover:shadow-3xl transition-all duration-300`}
          >
            <Plus className="h-5 w-5" />
            <span className="text-lg">
              افزودن اولین {activeTab === 'supplement' ? 'مکمل' : 'ویتامین'}
            </span>
          </Button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          animate={{
            x: [0, 10, 0],
            y: [0, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/4 right-8 opacity-10"
        >
          <ShoppingBag size={48} className="text-gray-400" />
        </motion.div>
      </motion.div>
    </div>
  );
};
