"use server";

import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

import { env } from "@/env";

export const createStripeCheackout = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Não autorizado.");
  }

  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia"
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/",
    subscription_data: {
      metadata: {
        clerk_user_id: userId
      }
    },
    line_items: [
      {
        price: env.STRIPE_PRO_PLAN_PRICE_ID,
        quantity: 1
      }
    ]
  });

  return { sessionId: session.id };
};
