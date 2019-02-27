import React from "react";
import TableData from "../TableData";
import AuctionEndingIn from "./AuctionEndingIn";

import { IAuction } from "../../types/auction.type";
import "./AuctionInfo.scss";

export default ({ title, startingBid, currentMaxBid, endDate }: IAuction) => (
  <div className="auction-info">
    <div className="title">{title}</div>
    <TableData value={startingBid + " CHF"} title="Starting Bid" />
    <TableData value={currentMaxBid + " CHF"} title="Current Bid" />
    <AuctionEndingIn endDate={endDate} />
  </div>
);
