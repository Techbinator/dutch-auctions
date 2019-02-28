import React from "react";
import TableData from "../TableData";
import AuctionEndingIn from "./AuctionEndingIn";
import CurrentPrice from "./CurrentPrice";

import { IAuction } from "../../types/auction.type";
import "./AuctionInfo.scss";

export default ({ auction }: { auction: IAuction }) => {
  const { title, startingBid, currentMaxBid } = auction;
  return (
    <>
      <div className="auction-title">{title}</div>
      <TableData value={startingBid + " CHF"} title="Starting Bid" />
      <TableData value={currentMaxBid + " CHF"} title="Current Bid" />
      <AuctionEndingIn auction={auction} />
      <CurrentPrice auction={auction} />
    </>
  );
};
