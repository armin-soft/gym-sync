
import React from "react";
import { motion } from "framer-motion";

interface StudentLoginHeaderProps {
  step: "phone" | "code";
  phone?: string;
  variants: any;
}

export const StudentLoginHeader = ({ step, phone, variants }: StudentLoginHeaderProps) => {
  return (
    <motion.div variants={variants} className="text-center mb-6">
      {step === "phone" ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            ورود شاگرد
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            شماره موبایل خود را وارد کنید
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            تأیید کد
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            کد ارسال شده به {phone} را وارد کنید
          </p>
        </>
      )}
    </motion.div>
  );
};
