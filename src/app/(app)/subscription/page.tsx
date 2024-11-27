import { CheckIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { AcquireButton } from "./components/acquire-button";

const benefits = [
  "Transações ilimitadas",
  "Recursos Avançados de IA",
  "Sem anúncios"
];

export default function SubscriptionPage() {
  const hasPaidPlan = false;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">Escolha seu plano</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Plano gratuito</CardTitle>
            <CardDescription>Recursos limitados</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              <li className="flex items-center">
                <XIcon className="mr-2 h-4 w-4 text-red-500" />
                <span>Apenas 20 transações por mês (7/20)</span>
              </li>
              <li className="flex items-center">
                <XIcon className="mr-2 h-4 w-4 text-red-500" />
                <span>Suporte básico</span>
              </li>
              <li className="flex items-center">
                <XIcon className="mr-2 h-4 w-4 text-red-500" />
                <span>Anúncios</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              {hasPaidPlan ? "Plano básico" : "Plano atual"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-primary">
          <CardHeader>
            <CardTitle>Plano Pro</CardTitle>
            <CardDescription>Recursos Avançados com IA</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            {!hasPaidPlan && (
              <>
                <div className="mt-4 text-center text-3xl font-semibold">
                  R$ 9.80{" "}
                  <span className="text-lg font-normal opacity-80">/mês</span>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-2">
            {hasPaidPlan && (
              <p className="text-sm text-muted-foreground">
                Parabéns, você possui o plano PRO ativo!
              </p>
            )}
            <AcquireButton hasPaidPlan={hasPaidPlan} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
