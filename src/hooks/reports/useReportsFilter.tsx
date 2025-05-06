
import { useState } from 'react';

export const useReportsFilter = () => {
  const [timeRange, setTimeRange] = useState("6months");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const closeFilters = () => {
    setFiltersOpen(false);
  };

  return {
    timeRange,
    filtersOpen,
    setTimeRange,
    toggleFilters,
    closeFilters
  };
};

