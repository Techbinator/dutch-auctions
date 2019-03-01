import React from "react";
import { IAuctionPriceAndStatus } from "../../helpers/auction";
import TableData from "../TableData";

const AuctionComplete = () => <span className="error">Auction ended</span>;

function fmtMSS(s: number): string {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}
export default ({ ended, secUntilAuctionEnds }: IAuctionPriceAndStatus) => {
  const value = ended ? <AuctionComplete /> : fmtMSS(secUntilAuctionEnds);

  return <TableData value={value} title="Ending in" />;
};
