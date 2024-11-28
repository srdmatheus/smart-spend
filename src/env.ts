import { z } from "zod";

const envSChema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  NEXT_PUBLIC_PUBLISHABLE_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  STRIPE_PRO_PLAN_PRICE_ID: z.string()
});

export const env = envSChema.parse(process.env);
