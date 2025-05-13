
import { ReportsTitle } from './components/ReportsTitle';
import { ReportsActions } from './components/ReportsActions';
import { ReportsUpdateStatus } from './components/ReportsUpdateStatus';

interface ReportsHeaderProps {
  isRefreshing: boolean;
  filtersOpen: boolean;
  handleRefresh: () => void;
  toggleFilters: () => void;
  isMobile: boolean;
}

export const ReportsHeader = ({
  isRefreshing,
  filtersOpen,
  handleRefresh,
  toggleFilters,
  isMobile
}: ReportsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
      <ReportsTitle isMobile={isMobile} />
      
      <div className="flex items-center gap-3 flex-wrap">
        <ReportsActions 
          isRefreshing={isRefreshing}
          filtersOpen={filtersOpen}
          handleRefresh={handleRefresh}
          toggleFilters={toggleFilters}
        />
        <ReportsUpdateStatus />
      </div>
    </div>
  );
};
