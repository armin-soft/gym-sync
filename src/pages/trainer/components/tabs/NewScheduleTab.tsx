
import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewScheduleTabProps {
  profileData: any;
}

export const NewScheduleTab = ({ profileData }: NewScheduleTabProps) => {
  const schedule = profileData.profileData.workSchedule;

  const days = [
    { key: "saturday", name: "شنبه", color: "from-emerald-500 to-teal-600" },
    { key: "sunday", name: "یکشنبه", color: "from-sky-500 to-blue-600" },
    { key: "monday", name: "دوشنبه", color: "from-purple-500 to-pink-600" },
    { key: "tuesday", name: "سه‌شنبه", color: "from-orange-500 to-red-600" },
    { key: "wednesday", name: "چهارشنبه", color: "from-indigo-500 to-purple-600" },
    { key: "thursday", name: "پنج‌شنبه", color: "from-pink-500 to-rose-600" },
    { key: "friday", name: "جمعه", color: "from-gray-500 to-slate-600" }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          برنامه کاری هفتگی
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          ساعات کاری خود را در طول هفته تنظیم کنید
        </p>
      </motion.div>

      <div className="space-y-4">
        {days.map((day, index) => (
          <motion.div
            key={day.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-lg">
              {/* نوار رنگی کناری */}
              <div className={`absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b ${day.color}`} />
              
              <div className="p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  {/* روز هفته */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${day.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-sm">
                        {day.name.slice(0, 2)}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {day.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        {schedule[day.key].active ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm ${
                          schedule[day.key].active 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {schedule[day.key].active ? 'فعال' : 'غیرفعال'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* تنظیمات */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
                    {/* فعال/غیرفعال */}
                    <div className="flex items-center gap-2">
                      <Label className="text-sm text-gray-600 dark:text-gray-300">
                        وضعیت:
                      </Label>
                      <Switch 
                        checked={schedule[day.key].active}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-500 data-[state=checked]:to-sky-600"
                      />
                    </div>

                    {/* ساعت شروع و پایان */}
                    {schedule[day.key].active && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm text-gray-600 dark:text-gray-300">
                            از:
                          </Label>
                          <Input
                            value={schedule[day.key].start}
                            className="w-20 text-center bg-white/80 dark:bg-gray-800/80 text-sm"
                            dir="ltr"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Label className="text-sm text-gray-600 dark:text-gray-300">
                            تا:
                          </Label>
                          <Input
                            value={schedule[day.key].end}
                            className="w-20 text-center bg-white/80 dark:bg-gray-800/80 text-sm"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* خلاصه برنامه کاری */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20 border border-emerald-200 dark:border-emerald-800">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                خلاصه برنامه کاری
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                در هفته جاری، {Object.values(schedule).filter((day: any) => day.active).length} روز فعالیت دارید
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
                <span className="text-sm text-gray-500">روز فعال:</span>
                <span className="font-bold text-emerald-600 mr-2">
                  {Object.values(schedule).filter((day: any) => day.active).length}
                </span>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow">
                <span className="text-sm text-gray-500">روز تعطیل:</span>
                <span className="font-bold text-red-600 mr-2">
                  {Object.values(schedule).filter((day: any) => !day.active).length}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
