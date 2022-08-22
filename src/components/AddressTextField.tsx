import React from "react";


interface AddressTextFieldProps {
  label: string;
  addr: string;
  addrIsValid: boolean;
  onAddrChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddressTextField({
  label,
  addr,
  addrIsValid,
  onAddrChange,
}: AddressTextFieldProps): JSX.Element {
  return addrIsValid ? (
    <input
        type="text"
      placeholder={label}
      value={addr}
      onChange={onAddrChange}
    />
  ) : (
    <input
        type="text"
      placeholder="outlined"
      value={addr}
      onChange={onAddrChange}
    />
  );
}
