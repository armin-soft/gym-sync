
import { toPersianNumbers } from "@/lib/utils/numbers";

interface ChartTooltipProps {
  active: boolean;
  payload: any[];
  label: string;
  chartConfig: Record<string, any>;
}

export const ChartTooltip = ({ active, payload, label, chartConfig }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 border border-border/30 rounded-lg shadow-lg">
        <p className="text-sm font-medium mb-2 text-foreground">{label || ''}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center text-xs">
              <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }} />
              <span className="text-muted-foreground">{chartConfig[entry.name]?.label || entry.name}: </span>
              <span className="font-medium ml-1">{formatValue(entry.value, entry.name)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const formatValue = (value: number, name: string) => {
  if (!value && value !== 0) return '0';
  
  if (name === 'درآمد' && name.includes('overview')) {
    return `${toPersianNumbers(value)} میلیون`;
  }
  if (name === 'درآمد') {
    return `${toPersianNumbers(value.toLocaleString())} تومان`;
  }
  if (name.includes('رشد')) {
    return `${toPersianNumbers(value.toFixed(1))}%`;
  }
  return toPersianNumbers(value);
};
