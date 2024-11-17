import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function Component() {
  const benefits = [
    "Unlimited storage",
    "Priority support",
    "Ad-free experience",
    "Advanced analytics",
    "Collaboration tools"
  ];
  const hasPaidPlan = true;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Choose Your Subscription
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Free Plan Card */}
        <Card>
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardDescription>Basic features for personal use</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Limited storage</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Basic support</span>
              </li>
              <li className="flex items-center">
                <X className="mr-2 h-4 w-4 text-red-500" />
                <span>Ad-supported</span>
              </li>
              {benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center text-muted-foreground"
                >
                  <X className="mr-2 h-4 w-4 text-red-500" />
                  <span className="line-through">{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled={hasPaidPlan}>
              {hasPaidPlan ? "Basic Plan" : "Current Plan"}
            </Button>
          </CardFooter>
        </Card>

        {/* Paid Plan Card */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Paid Plan</CardTitle>
            <CardDescription>Advanced features for power users</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            {!hasPaidPlan && (
              <div className="mt-4 text-center text-2xl font-bold">
                $9.99/month
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            <Button className="w-full" disabled={hasPaidPlan}>
              {hasPaidPlan ? "Current Plan" : "Upgrade Now"}
            </Button>
            {hasPaidPlan && (
              <p className="text-sm text-muted-foreground">
                You have an active paid plan
              </p>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
