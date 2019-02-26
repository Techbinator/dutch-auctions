import React from "react";
import "./NewAuction.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default () => (
  <div className="new-auction box-shadow-hover">
    <div className="icon-container">
      <FontAwesomeIcon icon={faPlus} />
    </div>
    <form action="#" method="get">
      <input
        type="string"
        placeholder="Title"
        required
        minLength={1}
        maxLength={50}
      />
      <input type="number" placeholder="Price" min="1" max="10000000" />
      <button type="submit">New Auction</button>
    </form>
  </div>
);
