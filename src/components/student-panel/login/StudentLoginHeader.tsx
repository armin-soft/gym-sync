
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

interface StudentLoginHeaderProps {
  variants: any;
}

export const StudentLoginHeader = ({ variants }: StudentLoginHeaderProps) => {
  return (
    <motion.div variants={variants} className="text-center mb-8">
      <div className="relative inline-block">
        <motion.div
          className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <GraduationCap className="h-10 w-10 text-white" />
        </motion.div>
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-transparent mb-2">
        ورود به پنل شاگرد
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        به پورتال تمرینات و برنامه شخصی خود خوش آمدید
      </p>
    </motion.div>
  );
};
