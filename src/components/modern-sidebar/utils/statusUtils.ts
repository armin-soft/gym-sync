
export const getStatusColor = (status: 'active' | 'busy' | 'offline') => {
  switch (status) {
    case 'active': return 'bg-emerald-500';
    case 'busy': return 'bg-amber-500';
    case 'offline': return 'bg-slate-400';
    default: return 'bg-emerald-500';
  }
};

export const getStatusText = (status: 'active' | 'busy' | 'offline') => {
  switch (status) {
    case 'active': return 'فعال';
    case 'busy': return 'مشغول';
    case 'offline': return 'آفلاین';
    default: return 'فعال';
  }
};
