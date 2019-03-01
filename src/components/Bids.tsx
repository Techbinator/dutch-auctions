import React from "react";
import "./Bids.scss";
import { IBid } from "../types/auction.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const Bid = ({ bid, isFirst }: { bid: IBid; isFirst: boolean }) => {
  const { userEmail, amount, createdAt } = bid;
  const formatedCreatedAt = new Date(createdAt).toString();
  return (
    <div className="bid">
      <span>
        {isFirst && <FontAwesomeIcon icon={faTrophy} />}
        {userEmail}
      </span>
      <span>{amount.toFixed(2)} CHF</span>
      <span>{formatedCreatedAt}</span>
    </div>
  );
};

export default ({ bids }: { bids: IBid[] }) => (
  <div className="bids-container">
    <div className="title">Bids ({bids.length})</div>
    <div className="bids-info">
      {bids.map((bid, index) => (
        <Bid isFirst={index === 0} key={bid.id} bid={bid} />
      ))}
    </div>
  </div>
);
