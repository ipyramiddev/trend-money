import React from "react";

interface AmountTextFieldProps {
  label: string;
  amount: string;
  amountIsValid: boolean;
  errorMessage: string;
  onAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AmountTextField({
  label,
  amount,
  amountIsValid,
  errorMessage,
  onAmountChange,
}: AmountTextFieldProps): JSX.Element {
  return (
    <div>
      <p>{label}</p>
      <input
        type="text"
        placeholder={label}
        value={amount}
        onChange={onAmountChange}
      />
    </div>
  )
}
