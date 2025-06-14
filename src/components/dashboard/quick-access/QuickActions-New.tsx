
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { QuickActionCard } from "./components/QuickActionCard";
import { quickActions } from "./data/quickActionsData";

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 15, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const QuickActionsNew = () => {
  const navigate = useNavigate();
  const deviceInfo = useDeviceInfo();

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="mb-8"
    >
      <motion.div 
        className="mb-6"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">
          دسترسی سریع
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          ابزارهای پرکاربرد برای مدیریت بهتر
        </p>
      </motion.div>

      <motion.div
        className={`grid gap-4 ${
          deviceInfo.isMobile 
            ? 'grid-cols-1' 
            : deviceInfo.isTablet 
            ? 'grid-cols-2' 
            : 'grid-cols-3'
        }`}
        variants={containerVariants}
      >
        {quickActions.map((action, index) => (
          <QuickActionCard
            key={action.title}
            title={action.title}
            description={action.description}
            icon={action.icon}
            path={action.href}
            gradient={index % 2 === 0 ? "from-emerald-500 to-sky-600" : "from-sky-500 to-emerald-600"}
            bgGradient={index % 2 === 0 ? "from-emerald-50 to-sky-50" : "from-sky-50 to-emerald-50"}
            darkBgGradient={index % 2 === 0 ? "from-emerald-900/20 to-sky-900/20" : "from-sky-900/20 to-emerald-900/20"}
            index={index}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default QuickActionsNew;
