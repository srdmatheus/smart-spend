"use client";

import { useState } from "react";

import { generateAIReport } from "@/actions/generate-ai-report";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import Markdown from "react-markdown";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AIReportButton = ({ month }: { month: string }) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAIReport({ month });
      setReport(aiReport);
    } catch (error) {
      console.error(error);
    } finally {
      setReportIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Relatório com IA <SparklesIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Relatório com Inteligência Artificial</DialogTitle>
          <DialogDescription>
            Obtenha insights personalizados sobre suas finanças.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="prose max-h-[450px] text-foreground prose-h3:text-foreground prose-h4:text-foreground prose-strong:text-foreground">
          <Markdown>{report}</Markdown>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild className="w-1/2">
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button className="w-1/2" onClick={handleGenerateReportClick}>
            {reportIsLoading ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Gerar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
