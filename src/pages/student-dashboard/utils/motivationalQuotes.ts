
import { Target, Award, TrendingUp, Zap, LucideIcon } from "lucide-react";

export interface MotivationalQuote {
  text: string;
  icon: LucideIcon;
}

export const getMotivationalQuote = (): MotivationalQuote => {
  const quotes: MotivationalQuote[] = [
    { text: "امروز روزی است که تبدیل به بهترین نسخه خودت شوی!", icon: Zap },
    { text: "هر قدم کوچک، شما را به هدف بزرگتری نزدیک می‌کند!", icon: Target },
    { text: "استقامت امروز، موفقیت فردا است!", icon: Award },
    { text: "راه هزار میل با یک قدم آغاز می‌شود!", icon: TrendingUp }
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};
