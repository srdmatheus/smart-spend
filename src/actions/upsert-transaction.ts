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

const upsertTransactionSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  amount: z.number(),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(TransactionCategory),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod),
  date: z.date()
});

type UpsertTransactionParam = z.infer<typeof upsertTransactionSchema>;

export const upsertTransaction = async (params: UpsertTransactionParam) => {
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Id de usuário não encontrado!");
  }

  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params.id ?? ""
    }
  });

  revalidatePath("/transactions");
};
