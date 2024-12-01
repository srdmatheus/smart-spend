import Link from "next/link";

import { Button } from "@/components/ui/button";

export const ManagePlanButton = () => {
  return (
    <Button asChild variant="outline" className="w-full">
      <Link href={process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_URL!}>
        Gerenciar plano
      </Link>
    </Button>
  );
};
