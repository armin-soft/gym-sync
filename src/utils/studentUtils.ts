
// Format payment value with thousands separator
export const formatPayment = (value: string): string => {
  const numericValue = value.replace(/\D/g, '');
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
