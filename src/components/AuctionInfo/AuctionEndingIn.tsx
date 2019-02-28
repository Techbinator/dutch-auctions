import React from "react";
import Countdown from "react-countdown-now";

import TableData from "../TableData";
import { IAuction } from "../../types/auction.type";
import { calculatePriceAndStatus } from "../../helpers/auction";

const AuctionComplete = () => <span className="error">Auction ended</span>;

const RenderEndDate = ({ auction }: { auction: IAuction }) => {
  const priceAndStatus = calculatePriceAndStatus(auction);
  if (priceAndStatus.ended) {
    return <AuctionComplete />;
  }
  return (
    <Countdown date={auction.endDate} daysInHours>
      <AuctionComplete />
    </Countdown>
  );
};

export default ({ auction }: { auction: IAuction }) => (
  <TableData value={<RenderEndDate auction={auction} />} title="Ending in" />
);
