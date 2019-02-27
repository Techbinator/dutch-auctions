import React from "react";
import Countdown from "react-countdown-now";

import TableData from "../TableData";

const AuctionComplete = () => <span className="error">Auction ended</span>;

function renderEndDate(endDate: number) {
  if (endDate < new Date().getTime()) {
    return <AuctionComplete />;
  }
  return (
    <Countdown date={endDate} daysInHours>
      <AuctionComplete />
    </Countdown>
  );
}

export default ({ endDate }: { endDate: number }) => (
  <TableData value={renderEndDate(endDate)} title="Ending in" />
);
