import { PlanType } from "@/constants";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUserDetails() {
  const { userId } = auth();

  if (!userId) {
    return { hasProPlan: false, user: null };
  }

  const user = await clerkClient().users.getUser(userId);

  const hasProPlan = user?.publicMetadata.subscriptionPlan === PlanType.PRO;

  return { hasProPlan, user, userId };
}
