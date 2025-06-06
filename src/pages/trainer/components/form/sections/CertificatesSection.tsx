
import { motion } from "framer-motion";
import { Award, Plus, Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModernFormField } from "../ModernFormField";
import { toPersianNumbers } from "@/lib/utils/numbers";

interface CertificatesSectionProps {
  profileData: any;
  deviceInfo: any;
}

export const CertificatesSection = ({ profileData, deviceInfo }: CertificatesSectionProps) => {
  const { profile, updateProfile } = profileData;
  // Ensure certificates is always an array, even if it's undefined or null
  const certificates = Array.isArray(profile?.certifications) ? profile.certifications : [];

  const addCertificate = () => {
    const newCertificate = {
      title: "",
      issuer: "",
      date: "",
      certificateId: ""
    };
    
    const updatedCertificates = [...certificates, newCertificate];
    updateProfile('certifications', null, updatedCertificates);
  };

  const removeCertificate = (index: number) => {
    const updatedCertificates = certificates.filter((_: any, i: number) => i !== index);
    updateProfile('certifications', null, updatedCertificates);
  };

  const updateCertificate = (index: number, field: string, value: string) => {
    const updatedCertificates = certificates.map((cert: any, i: number) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    updateProfile('certifications', null, updatedCertificates);
  };

  return (
    <div className="space-y-6">
      {/* هدر بخش */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
            <Award className="h-5 w-5 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              مدارک و گواهینامه‌ها
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              مدارک حرفه‌ای و گواهینامه‌های خود را مدیریت کنید
            </p>
          </div>
        </div>
        
        <Button
          onClick={addCertificate}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
        >
          <Plus className="h-4 w-4 ml-2" />
          افزودن مدرک
        </Button>
      </div>

      {/* لیست گواهینامه‌ها */}
      <div className="space-y-4">
        {certificates.length === 0 ? (
          <motion.div 
            className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              هنوز هیچ مدرک یا گواهینامه‌ای اضافه نکرده‌اید
            </p>
            <Button
              onClick={addCertificate}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Plus className="h-4 w-4 ml-2" />
              اولین مدرک را اضافه کنید
            </Button>
          </motion.div>
        ) : (
          certificates.map((certificate: any, index: number) => (
            <motion.div
              key={index}
              className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    گواهینامه {toPersianNumbers((index + 1).toString())}
                  </span>
                </div>
                <Button
                  onClick={() => removeCertificate(index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ModernFormField
                  id={`cert-title-${index}`}
                  label="عنوان گواهینامه"
                  value={certificate.title}
                  onChange={(value) => updateCertificate(index, 'title', value)}
                  placeholder="عنوان گواهینامه"
                  icon={<Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-600/70" />}
                  required
                />
                
                <ModernFormField
                  id={`cert-issuer-${index}`}
                  label="صادرکننده"
                  value={certificate.issuer}
                  onChange={(value) => updateCertificate(index, 'issuer', value)}
                  placeholder="نام موسسه صادرکننده"
                  icon={<Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-600/70" />}
                  required
                />
                
                <ModernFormField
                  id={`cert-date-${index}`}
                  label="تاریخ صدور"
                  value={certificate.date}
                  onChange={(value) => updateCertificate(index, 'date', value)}
                  placeholder="۱۴۰۰/۰۶/۱۵"
                  icon={<Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-600/70" />}
                />
                
                <ModernFormField
                  id={`cert-id-${index}`}
                  label="شماره گواهینامه"
                  value={certificate.certificateId}
                  onChange={(value) => updateCertificate(index, 'certificateId', value)}
                  placeholder="BB-۱۴۰۰-۰۰۱۲۳"
                  icon={<Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-600/70" />}
                  dir="ltr"
                />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
