
import { StatCardsSection } from "./StatCardsSection";

interface StatCardGridProps {
  currentMonth: any;
  previousMonth: any;
  deviceInfo: any;
}

export const StatCardGrid = ({ currentMonth, previousMonth, deviceInfo }: StatCardGridProps) => {
  return (
    <StatCardsSection
      currentMonth={currentMonth}
      previousMonth={previousMonth}
      deviceInfo={deviceInfo}
    />
  );
};
