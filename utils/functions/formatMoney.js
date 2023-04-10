export const formatMoney = (n) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
}

export const formatMoneyClaim = (n) => {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n);
}