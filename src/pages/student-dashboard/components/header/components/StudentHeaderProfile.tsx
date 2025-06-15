
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User, TrendingUp } from "lucide-react";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface StudentHeaderProfileProps {
  studentProfile: {
    name: string;
    image: string;
  };
  overallProgress: number;
  greeting: string;
}

export const StudentHeaderProfile = ({ studentProfile, overallProgress, greeting }: StudentHeaderProfileProps) => {
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <motion.div 
          className="absolute -inset-1 rounded-full bg-white/30 blur-sm"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <Avatar className="h-20 w-20 border-4 border-white/30 relative shadow-xl">
          <AvatarImage 
            src={studentProfile.image} 
            alt="تصویر پروفایل شاگرد"
          />
          <AvatarFallback className="bg-white/20 text-white font-bold text-lg backdrop-blur-sm">
            <User className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        
        <motion.div 
          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-green-400 shadow-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <TrendingUp className="h-4 w-4 text-white" fill="currentColor" />
        </motion.div>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2">
          {greeting} {studentProfile.name}!
        </h1>
        <div className="flex items-center gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
            <span className="text-white/90 text-sm">پیشرفت کلی: </span>
            <span className="text-white font-bold">
              {toPersianNumbers(overallProgress.toString())}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
