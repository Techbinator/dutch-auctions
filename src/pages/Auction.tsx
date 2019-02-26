import React from "react";
import TableData from "../components/TableData";
import Bids from "../components/Bids";
import "./Auction.scss";

export default () => {
  return (
    <div className="auction">
      <div className="top">
        <div className="left-container box-shadow">
          <div className="animated-background" />
        </div>
        <div className="right-container">
          <div className="title">Product name</div>
          <TableData title="Time left" value="4 min" />
          <TableData title="Starting Price" value="21CHF" />
          <TableData title="Price" value="23CHF" />
          <form className="price">
            <input type="number" min="20" maxLength={9} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="bottom">
        <Bids />
      </div>
    </div>
  );
};
