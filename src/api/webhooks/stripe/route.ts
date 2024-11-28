import { NextResponse } from "next/server";

import { PlanType } from "@/constants";
import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";

import { env } from "@/env";

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();
  const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-10-28.acacia"
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    env.STRIPE_WEBHOOK_SECRET
  );

  switch (event.type) {
    case "invoice.paid": {
      const { customer, subscription, subscription_details } =
        event.data.object;
      const clerkUserId = subscription_details?.metadata?.clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription
        },
        publicMetadata: {
          subscriptionPlan: PlanType.PRO
        }
      });
      break;
    }
  }
  return NextResponse.json({ received: true });
};
