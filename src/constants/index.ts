import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType
} from "@prisma/client";

export const transactionTypeMap: Record<TransactionType, string> = {
  [TransactionType.DEPOSIT]: "Depósito",
  [TransactionType.EXPENSE]: "Despesa",
  [TransactionType.INVESTMENT]: "Investimento"
};

export const transactionCategoryMap: Record<TransactionCategory, string> = {
  [TransactionCategory.HOUSING]: "Moradia",
  [TransactionCategory.TRANSPORTATION]: "Transporte",
  [TransactionCategory.FOOD]: "Alimentação",
  [TransactionCategory.ENTERTAINMENT]: "Entretenimento",
  [TransactionCategory.HEALTH]: "Saúde",
  [TransactionCategory.UTILITY]: "Utilidade",
  [TransactionCategory.SALARY]: "Salário",
  [TransactionCategory.EDUCATION]: "Educação",
  [TransactionCategory.OTHER]: "Outro"
};

export const transactionPaymentMethodMap: Record<
  TransactionPaymentMethod,
  string
> = {
  [TransactionPaymentMethod.CREDIT_CARD]: "Cartão de Crédito",
  [TransactionPaymentMethod.DEBIT_CARD]: "Cartão de Débito",
  [TransactionPaymentMethod.BANK_TRANSFER]: "Transferência Bancária",
  [TransactionPaymentMethod.BANK_SLIP]: "Boleto Bancário",
  [TransactionPaymentMethod.CASH]: "Dinheiro",
  [TransactionPaymentMethod.PIX]: "Pix",
  [TransactionPaymentMethod.OTHER]: "Outro"
};
