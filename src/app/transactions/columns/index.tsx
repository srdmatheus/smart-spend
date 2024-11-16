"use client";

import {
  transactionCategoryMap,
  transactionPaymentMethodMap,
  transactionTypeMap
} from "@/constants";
import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome"
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original } }) => (
      <Badge variant={original.type} className="font-medium">
        {transactionTypeMap[original.type]}
      </Badge>
    )
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original } }) => (
      <span>{transactionCategoryMap[original.category] ?? "-"}</span>
    )
  },
  {
    accessorKey: "paymentMethod",
    header: "Método",
    cell: ({ row: { original } }) => (
      <span>{transactionPaymentMethodMap[original.paymentMethod]}</span>
    )
  },
  {
    accessorKey: "date",
    header: "Data"
  },
  {
    accessorKey: "amount",
    header: "Valor"
  },
  {
    accessorKey: "actions",
    header: ""
  }
];
