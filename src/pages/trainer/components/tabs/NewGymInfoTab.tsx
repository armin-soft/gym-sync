
import { motion } from "framer-motion";
import { Building, Phone, Globe, MapPin, Clock, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface NewGymInfoTabProps {
  profileData: any;
}

export const NewGymInfoTab = ({ profileData }: NewGymInfoTabProps) => {
  const gymInfo = profileData.profileData.gymInfo;

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Building className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          اطلاعات باشگاه
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          اطلاعات کامل باشگاه خود را وارد کنید
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-sky-600" />
            نام باشگاه
          </Label>
          <Input
            value={gymInfo.gymName}
            className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-sky-500 focus:ring-sky-500"
            dir="rtl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4 text-sky-600" />
            تلفن باشگاه
          </Label>
          <Input
            value={gymInfo.gymPhone}
            className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-sky-500 focus:ring-sky-500"
            dir="rtl"
          />
        </motion.div>

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-sky-600" />
            آدرس باشگاه
          </Label>
          <Input
            value={gymInfo.gymAddress}
            className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-sky-500 focus:ring-sky-500"
            dir="rtl"
          />
        </motion.div>

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
            <Building className="w-4 h-4 text-sky-600" />
            توضیحات باشگاه
          </Label>
          <Textarea
            value={gymInfo.gymDescription}
            className="min-h-[100px] bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-sky-500 focus:ring-sky-500"
            dir="rtl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-sky-600" />
            وب‌سایت
          </Label>
          <Input
            value={gymInfo.gymWebsite}
            className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-sky-500 focus:ring-sky-500"
            dir="ltr"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-sky-600" />
            ساعات کاری
          </Label>
          <Input
            value={gymInfo.workingHours}
            className="bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 focus:border-sky-500 focus:ring-sky-500"
            dir="rtl"
          />
        </motion.div>

        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Label className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-sky-600" />
            امکانات
          </Label>
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {gymInfo.facilities.map((facility: string, index: number) => (
              <Badge 
                key={index} 
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white"
              >
                {facility}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
