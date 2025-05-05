
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns-jalali";
import { fa } from "date-fns/locale";

interface TimeRangeFiltersProps {
  filtersOpen: boolean;
  timeRange: string;
  setTimeRange: (range: string) => void;
  handleRefresh: () => void;
  closeFilters: () => void;
}

export const TimeRangeFilters = ({
  filtersOpen,
  timeRange,
  setTimeRange,
  handleRefresh,
  closeFilters
}: TimeRangeFiltersProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  if (!filtersOpen) return null;

  return (
    <Card className="p-4 sm:p-6 mb-4 shadow-lg backdrop-blur-sm bg-card/95 border border-border/50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium">فیلترهای گزارش</h3>
        <Button size="icon" variant="ghost" onClick={closeFilters} className="h-8 w-8 rounded-full">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-4">
          <div className="text-sm font-medium mb-2">بازه زمانی</div>
          <RadioGroup
            value={timeRange}
            onValueChange={setTimeRange}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          >
            <div>
              <RadioGroupItem value="week" id="week" className="sr-only peer" />
              <Label
                htmlFor="week"
                className="flex flex-col items-center justify-center rounded-md border-2 border-muted p-3 hover:bg-muted/30 hover:border-primary/30 peer-checked:bg-primary/10 peer-checked:border-primary/50 peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary/50 [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary/50 transition-colors cursor-pointer"
              >
                <span className="text-sm">هفته گذشته</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="month" id="month" className="sr-only peer" />
              <Label
                htmlFor="month"
                className="flex flex-col items-center justify-center rounded-md border-2 border-muted p-3 hover:bg-muted/30 hover:border-primary/30 peer-checked:bg-primary/10 peer-checked:border-primary/50 peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary/50 [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary/50 transition-colors cursor-pointer"
              >
                <span className="text-sm">ماه گذشته</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="quarter" id="quarter" className="sr-only peer" />
              <Label
                htmlFor="quarter"
                className="flex flex-col items-center justify-center rounded-md border-2 border-muted p-3 hover:bg-muted/30 hover:border-primary/30 peer-checked:bg-primary/10 peer-checked:border-primary/50 peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary/50 [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary/50 transition-colors cursor-pointer"
              >
                <span className="text-sm">فصل گذشته</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="6months" id="6months" className="sr-only peer" />
              <Label
                htmlFor="6months"
                className="flex flex-col items-center justify-center rounded-md border-2 border-muted p-3 hover:bg-muted/30 hover:border-primary/30 peer-checked:bg-primary/10 peer-checked:border-primary/50 peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary/50 [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary/50 transition-colors cursor-pointer"
              >
                <span className="text-sm">۶ ماه گذشته</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="year" id="year" className="sr-only peer" />
              <Label
                htmlFor="year"
                className="flex flex-col items-center justify-center rounded-md border-2 border-muted p-3 hover:bg-muted/30 hover:border-primary/30 peer-checked:bg-primary/10 peer-checked:border-primary/50 peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary/50 [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary/50 transition-colors cursor-pointer"
              >
                <span className="text-sm">سال گذشته</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem value="custom" id="custom" className="sr-only peer" />
              <Label
                htmlFor="custom"
                className="flex flex-col items-center justify-center rounded-md border-2 border-muted p-3 hover:bg-muted/30 hover:border-primary/30 peer-checked:bg-primary/10 peer-checked:border-primary/50 peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary/50 [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary/50 transition-colors cursor-pointer"
              >
                <span className="text-sm">سفارشی</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          {timeRange === "custom" && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="text-sm font-medium">انتخاب بازه زمانی سفارشی</div>
              <div className="grid gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-right font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "yyyy/MM/dd")} - {format(date.to, "yyyy/MM/dd")}
                          </>
                        ) : (
                          format(date.from, "yyyy/MM/dd")
                        )
                      ) : (
                        <span>انتخاب بازه زمانی</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                      locale={fa}
                      classNames={{
                        caption_label: "text-sm font-medium",
                        caption: "flex justify-center pt-1 relative items-center",
                        nav: "space-x-1 flex items-center",
                        nav_button: cn(
                          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                        ),
                        nav_button_previous: "absolute left-1",
                        nav_button_next: "absolute right-1",
                        table: "w-full border-collapse space-y-1",
                        head_row: "flex",
                        head_cell:
                          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                        row: "flex w-full mt-2",
                        cell: cn(
                          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected][data-state=open])]:bg-accent [&:has([aria-selected][data-state=open])]:text-accent-foreground",
                          "[&:has([aria-selected]:hover)]:bg-accent/50"
                        ),
                        day: cn(
                          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
                        ),
                        day_selected:
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground",
                        day_outside: "text-muted-foreground opacity-50",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_range_middle:
                          "aria-selected:bg-accent aria-selected:text-accent-foreground",
                        day_hidden: "invisible",
                      }}
                      components={{
                        IconLeft: () => <ChevronRight className="h-4 w-4" />,
                        IconRight: () => <ChevronLeft className="h-4 w-4" />,
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="flex justify-end mt-6 gap-3">
        <Button variant="outline" onClick={closeFilters} className="px-4">
          انصراف
        </Button>
        <Button onClick={handleRefresh} className="px-4 bg-primary text-white hover:bg-primary/90">
          اعمال فیلتر
        </Button>
      </div>
    </Card>
  );
};
