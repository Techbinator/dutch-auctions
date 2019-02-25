import React from "react";
import { NavLink } from "react-router-dom";

import TableData from "./TableData";
import "./AuctionListItem.scss";

export default () => (
  <NavLink className="auction-list-item box-shadow-hover" exact to="/auction">
    <div className="animated-background" />
    <div className="title">Product name</div>
    <TableData title="Time left" value="3hrs" />
    <TableData title="Highest Bid" value="22CHF" />
    <TableData title="Min Bid" value="40CHF" />
  </NavLink>
);
