"use client";

import { useState } from "react";

import { ArrowDownUpIcon } from "lucide-react";

import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";

type AddTransactionButtonProps = {
  userCanAddTransaction: boolean;
};

export const AddTransactionButton = ({
  userCanAddTransaction
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-block">
              <Button
                className="font-semibold"
                onClick={() => setDialogIsOpen(true)}
                disabled={!userCanAddTransaction}
              >
                Adicionar Transação
                <ArrowDownUpIcon />
              </Button>
            </span>
          </TooltipTrigger>
          {!userCanAddTransaction && (
            <TooltipContent>
              Você atingiu o limite de transações, contrate o plano PRO
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  );
};
