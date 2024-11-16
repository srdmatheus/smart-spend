import { ForwardedRef, forwardRef } from "react";

import { NumericFormat, NumericFormatProps } from "react-number-format";

import { Input, InputProps } from "@/components/ui/input";

export const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<InputProps>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$"
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
      />
    );
  }
);

MoneyInput.displayName = "MoneyInput";
