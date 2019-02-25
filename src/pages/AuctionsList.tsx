import React from "react";
import AuctionListItem from "../components/AuctionListItem";
import Filter from "../components/Filter";
export default () => (
  <>
    <Filter />
    <div className="auctionsList">
      <AuctionListItem />
      <AuctionListItem />
      <AuctionListItem />
      <AuctionListItem />
      <AuctionListItem />
      <AuctionListItem />
      <AuctionListItem />
    </div>
  </>
);
