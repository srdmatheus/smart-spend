"use client";

import { createStripeCheackout } from "@/actions/create-stripe-checkout";
import { PlanType } from "@/constants";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";

import { env } from "@/env";
import { Button } from "@/components/ui/button";

export const AcquireButton = () => {
  const { user } = useUser();

  const hasProPlan = user?.publicMetadata.subscriptionPlan === PlanType.PRO;

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheackout();

    const stripe = await loadStripe(env.NEXT_PUBLIC_PUBLISHABLE_KEY);

    await stripe?.redirectToCheckout({ sessionId });
  };
  return (
    <Button
      className="w-full"
      variant={hasProPlan ? "link" : "default"}
      onClick={handleAcquirePlanClick}
    >
      {hasProPlan ? "Gerenciar plano" : "Atualize agora"}
    </Button>
  );
};
