"use client";

import { createStripeCheackout } from "@/actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";

type AcquireButtonProps = {
  hasPaidPlan: boolean;
};
export const AcquireButton = ({ hasPaidPlan }: AcquireButtonProps) => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheackout();

    if (!process.env.NEXT_PUBLIC_PUBLISHABLE_KEY) {
      throw new Error("Chave stripe não encontrada.");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_PUBLISHABLE_KEY as string
    );

    await stripe?.redirectToCheckout({ sessionId });
  };
  return (
    <Button
      className="w-full"
      disabled={hasPaidPlan}
      onClick={handleAcquirePlanClick}
    >
      {hasPaidPlan ? "Plano atual" : "Atualize agora"}
    </Button>
  );
};
