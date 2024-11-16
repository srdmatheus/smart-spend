"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType
} from "@prisma/client";
import { z } from "zod";

import { db } from "@/lib/prisma";

const addTransactionSchema = z.object({
  name: z.string(),
  amount: z.number(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.date()
});

type AddTransactionParam = z.infer<typeof addTransactionSchema>;

export const addTransaction = async (params: AddTransactionParam) => {
  addTransactionSchema.parse(params);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Id de usuário não encontrado!");
  }

  await db.transaction.create({
    data: { ...params, userId }
  });

  revalidatePath("/transactions");
};
