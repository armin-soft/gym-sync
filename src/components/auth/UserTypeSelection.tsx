
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { Users, UserCog } from "lucide-react";

export const UserTypeSelection = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (type: 'management' | 'student') => {
    localStorage.setItem("hasSelectedUserType", "true");
    localStorage.setItem("selectedUserType", type);
    
    if (type === 'management') {
      navigate("/Management");
      // Reload to show the management interface
      window.location.reload();
    } else {
      navigate("/Panel");
      // Reload to show the student interface
      window.location.reload();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <PageContainer fullScreen fullHeight withBackground>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <div className="px-4 w-full max-w-2xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-4">
                انتخاب نوع ورود
              </h1>
              <p className="text-lg text-muted-foreground">
                لطفا نوع کاربری خود را انتخاب کنید
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Button
                  onClick={() => handleUserTypeSelection('management')}
                  className="w-full h-40 bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col gap-4"
                  size="lg"
                >
                  <UserCog className="h-16 w-16" />
                  <div className="text-center">
                    <h2 className="text-xl font-bold">پنل مدیریت مربی</h2>
                    <p className="text-sm opacity-90">مدیریت شاگردان و برنامه‌ها</p>
                  </div>
                </Button>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  onClick={() => handleUserTypeSelection('student')}
                  className="w-full h-40 bg-gradient-to-br from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col gap-4"
                  size="lg"
                >
                  <Users className="h-16 w-16" />
                  <div className="text-center">
                    <h2 className="text-xl font-bold">پنل شاگردان</h2>
                    <p className="text-sm opacity-90">مشاهده برنامه شخصی</p>
                  </div>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};
