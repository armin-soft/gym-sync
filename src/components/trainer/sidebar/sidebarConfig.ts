
import { User, Building, Globe } from "lucide-react";

export const sections = [
  { 
    id: "personal", 
    label: "اطلاعات شخصی", 
    icon: User, 
    gradient: "from-violet-500 to-purple-600",
    description: "مدیریت اطلاعات شخصی"
  },
  { 
    id: "gym", 
    label: "باشگاه", 
    icon: Building, 
    gradient: "from-blue-500 to-cyan-600",
    description: "اطلاعات باشگاه"
  },
  { 
    id: "social", 
    label: "شبکه‌های اجتماعی", 
    icon: Globe, 
    gradient: "from-emerald-500 to-teal-600",
    description: "حضور آنلاین"
  }
];
