export const currencyFormatter = (amount: number) => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(amount);
};
