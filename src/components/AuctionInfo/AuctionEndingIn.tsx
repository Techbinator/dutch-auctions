import React from "react";
import Countdown from "react-countdown-now";

import TableData from "../TableData";

interface IAuctionEndingIn {
  endDate: number;
  auctionEnded: boolean;
}

const AuctionComplete = () => <span className="error">Auction ended</span>;

function renderEndDate(endDate: number, auctionEnded: boolean) {
  if (endDate < new Date().getTime() || auctionEnded) {
    return <AuctionComplete />;
  }
  return (
    <Countdown date={endDate} daysInHours>
      <AuctionComplete />
    </Countdown>
  );
}

export default ({ endDate, auctionEnded }: IAuctionEndingIn) => (
  <TableData value={renderEndDate(endDate, auctionEnded)} title="Ending in" />
);
