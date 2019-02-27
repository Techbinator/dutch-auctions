import React from "react";
import { NavLink } from "react-router-dom";
import AuctionInfo from "./AuctionInfo";
import { IAuction } from "../types/auction.type";

import "./AuctionListItem.scss";

export default (auction: IAuction) => {
  const { id } = auction;
  return (
    <NavLink
      className="auction-list-item box-shadow-hover"
      exact
      to={`auction/${id}`}
    >
      <div className="dummy-image" />
      <AuctionInfo {...auction} />
    </NavLink>
  );
};
