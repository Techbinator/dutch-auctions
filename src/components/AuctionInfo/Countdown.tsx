import React from "react";
import { IAuctionPriceAndStatus } from "../../helpers/auction";
import { fmtMSS } from "../../helpers/time";
import TableData from "../TableData";

const AuctionComplete = () => <span className="error">Auction ended</span>;

export default ({ ended, secDiff }: IAuctionPriceAndStatus) => {
  const value = ended ? <AuctionComplete /> : fmtMSS(secDiff);

  return <TableData value={value} title="Ending in" />;
};
