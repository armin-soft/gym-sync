
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface TimeRangeOptionsProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
}

export const TimeRangeOptions = ({ timeRange, setTimeRange }: TimeRangeOptionsProps) => {
  return (
    <div className="space-y-4">
      <div className="text-sm font-medium mb-2">بازه زمانی</div>
      <RadioGroup
        value={timeRange}
        onValueChange={setTimeRange}
        className="grid grid-cols-2 sm:grid-cols-3 gap-2"
      >
        <TimeRangeOption value="week" label="هفته گذشته" />
        <TimeRangeOption value="month" label="ماه گذشته" />
        <TimeRangeOption value="quarter" label="فصل گذشته" />
        <TimeRangeOption value="6months" label="۶ ماه گذشته" />
        <TimeRangeOption value="year" label="سال گذشته" />
        <TimeRangeOption value="custom" label="سفارشی" />
      </RadioGroup>
    </div>
  );
};

interface TimeRangeOptionProps {
  value: string;
  label: string;
}

const TimeRangeOption = ({ value, label }: TimeRangeOptionProps) => (
  <div>
    <RadioGroupItem value={value} id={value} className="sr-only peer" />
    <Label
      htmlFor={value}
      className="flex flex-col items-center justify-center rounded-md border-2 border-muted p-3 hover:bg-muted/30 hover:border-primary/30 peer-checked:bg-primary/10 peer-checked:border-primary/50 peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:border-primary/50 [&:has([data-state=checked])]:bg-primary/10 [&:has([data-state=checked])]:border-primary/50 transition-colors cursor-pointer"
    >
      <span className="text-sm">{label}</span>
    </Label>
  </div>
);
