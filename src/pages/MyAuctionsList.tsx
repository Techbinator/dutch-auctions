import React from "react";
import AuctionListItem from "../components/AuctionListItem";
import NewAuction from "../components/NewAuction";

export default () => (
  <div className="auctionsList">
    <NewAuction />
    <AuctionListItem />
    <AuctionListItem />
  </div>
);
