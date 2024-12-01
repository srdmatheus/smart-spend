"use client";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "@/components/ui/button";

export const AcquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!);

    await stripe?.redirectToCheckout({ sessionId });
  };
  return (
    <Button className="w-full" onClick={handleAcquirePlanClick}>
      Atualize agora
    </Button>
  );
};
