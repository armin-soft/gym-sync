
import { motion } from "framer-motion";
import { Award, Plus, Calendar, Building, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface NewCertificationsTabProps {
  profileData: any;
}

export const NewCertificationsTab = ({ profileData }: NewCertificationsTabProps) => {
  const certifications = profileData.profileData.certifications;

  return (
    <div className="space-y-6">
      <motion.div
        className="text-center space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          گواهینامه‌ها و مدارک
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          مدارک و گواهینامه‌های حرفه‌ای خود را مدیریت کنید
        </p>
      </motion.div>

      <div className="space-y-4">
        {certifications.map((cert: any, index: number) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="p-6 bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {cert.title}
                      </h4>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-1">
                        <Building className="w-4 h-4" />
                        <span className="text-sm">{cert.issuer}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>تاریخ دریافت: {cert.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4" />
                      <span>شناسه: {cert.certificateId}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                    معتبر تا {cert.validUntil}
                  </Badge>
                  <Button variant="outline" size="sm">
                    ویرایش
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: certifications.length * 0.1 + 0.2, duration: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-dashed border-orange-300 dark:border-orange-700">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto opacity-50">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  افزودن گواهینامه جدید
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  گواهینامه‌ها و مدارک جدید خود را اضافه کنید
                </p>
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700">
                  <Plus className="w-4 h-4 ml-2" />
                  افزودن گواهینامه
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
