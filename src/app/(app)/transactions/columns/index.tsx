"use client";

import {
  transactionCategoryMap,
  transactionPaymentMethodMap,
  transactionTypeMap
} from "@/constants";
import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { EditTransactionButton } from "../components/edit-transaction-button";

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
    header: "Data",
    cell: ({ row: { original } }) => (
      <span>
        {new Date(original.date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })}
      </span>
    )
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original } }) => (
      <span>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        }).format(Number(original.amount))}
      </span>
    )
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original } }) => (
      <>
        <EditTransactionButton transaction={original} />
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </>
    )
  }
];
