export const formatCurrency = (price: number): string => {
  return price.toLocaleString("en-LK", {
    style: "currency",
    currency: "LKR",
  });
};