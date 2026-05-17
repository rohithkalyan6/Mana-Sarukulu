import { useSettingsContext } from '../context/SettingsContext';

export function useCurrency() {
  const { currency } = useSettingsContext();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return { formatCurrency, currency };
}
