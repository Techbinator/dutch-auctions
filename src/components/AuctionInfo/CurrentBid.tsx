import * as React from "react";

export interface ICurrentBidProps {
  currentMaxBid: number;
}

export function CurrentBid({ currentMaxBid }: ICurrentBidProps) {
  return (
    <span className={currentMaxBid ? "success" : ""}>
      {currentMaxBid.toFixed(2)} CHF
    </span>
  );
}
