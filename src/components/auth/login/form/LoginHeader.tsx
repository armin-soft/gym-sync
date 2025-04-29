
import { motion } from "framer-motion";
import { UserCircle2 } from "lucide-react";

interface LoginHeaderProps {
  gymName: string;
}

export const LoginHeader = ({ gymName }: LoginHeaderProps) => {
  return (
    <>
      <motion.div 
        className="mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-primary/20 to-indigo-500/40 p-2 sm:p-3 w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center shadow-lg shadow-primary/20"
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 20px 25px -5px rgba(67, 97, 238, 0.25), 0 10px 10px -5px rgba(67, 97, 238, 0.1)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <UserCircle2 className="h-10 sm:h-12 w-10 sm:w-12 text-primary" />
      </motion.div>
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-primary via-indigo-600 to-violet-600 bg-clip-text text-transparent">
          {gymName ? (
            <>ورود به سیستم مدیریت {gymName}</>
          ) : (
            <>ورود به سیستم مدیریت</>
          )}
        </h3>
        <motion.p 
          className="text-center text-muted-foreground text-xs sm:text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.4, duration: 0.5 }
          }}
        >
          مربی عزیز، لطفا با ایمیل و رمز عبور خود وارد شوید
        </motion.p>
      </div>
    </>
  );
};
