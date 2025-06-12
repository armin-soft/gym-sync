
import React from "react";
import { Search, Filter, Mail, MailOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useDeviceInfo } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MessagesFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  showUnreadOnly: boolean;
  setShowUnreadOnly: (show: boolean) => void;
  totalMessages: number;
  filteredMessages: number;
}

export const MessagesFilters: React.FC<MessagesFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedPriority,
  setSelectedPriority,
  showUnreadOnly,
  setShowUnreadOnly,
  totalMessages,
  filteredMessages
}) => {
  const deviceInfo = useDeviceInfo();

  const getPadding = () => {
    if (deviceInfo.isMobile) return "p-4";
    if (deviceInfo.isTablet) return "p-5";
    return "p-6";
  };

  const getGridCols = () => {
    if (deviceInfo.isMobile) return "grid-cols-1";
    if (deviceInfo.isTablet) return "grid-cols-2";
    return "grid-cols-4";
  };

  return (
    <div className={cn(
      "border-b border-gray-200/50 bg-gradient-to-l from-emerald-50/30 to-sky-50/20",
      getPadding()
    )} dir="rtl">
      <div className="space-y-4">
        {/* جستجو */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="جستجو در پیام‌ها..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 bg-white/60 border-gray-200/50 focus:border-emerald-300 focus:ring-emerald-200"
            dir="rtl"
          />
        </div>

        {/* فیلترها */}
        <div className={cn("grid gap-3", getGridCols())}>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-white/60 border-gray-200/50">
              <SelectValue placeholder="دسته‌بندی" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="all">همه دسته‌ها</SelectItem>
              <SelectItem value="technical">فنی</SelectItem>
              <SelectItem value="program">برنامه تمرینی</SelectItem>
              <SelectItem value="diet">تغذیه</SelectItem>
              <SelectItem value="payment">مالی</SelectItem>
              <SelectItem value="general">عمومی</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="bg-white/60 border-gray-200/50">
              <SelectValue placeholder="اولویت" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="all">همه اولویت‌ها</SelectItem>
              <SelectItem value="urgent">فوری</SelectItem>
              <SelectItem value="high">بالا</SelectItem>
              <SelectItem value="medium">متوسط</SelectItem>
              <SelectItem value="low">کم</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            variant={showUnreadOnly ? "default" : "outline"}
            className={cn(
              "justify-start",
              showUnreadOnly 
                ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white" 
                : "bg-white/60 border-gray-200/50"
            )}
          >
            {showUnreadOnly ? <Mail className="w-4 h-4 ml-2" /> : <MailOpen className="w-4 h-4 ml-2" />}
            {showUnreadOnly ? "خوانده نشده" : "همه"}
          </Button>

          <div className="flex items-center justify-end gap-2">
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
              {filteredMessages.toLocaleString('fa-IR')} از {totalMessages.toLocaleString('fa-IR')}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
