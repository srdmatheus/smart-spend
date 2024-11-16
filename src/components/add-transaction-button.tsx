"use client";

import { useState } from "react";

import { ArrowDownUpIcon } from "lucide-react";

import { Button } from "./ui/button";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";

export const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="rounded-full font-semibold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar Transação
        <ArrowDownUpIcon />
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};
