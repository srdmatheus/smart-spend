"use client";

import { useState } from "react";

import { Transaction } from "@prisma/client";
import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UpsertTransactionDialog } from "@/components/upsert-transaction-dialog";

type EditTransactionButtonProps = {
  transaction: Transaction;
};

export const EditTransactionButton = ({
  transaction
}: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>

      <UpsertTransactionDialog
        defaultValues={{ ...transaction, amount: Number(transaction.amount) }}
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        transactionId={transaction.id}
      />
    </>
  );
};
