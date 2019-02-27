import React from "react";
import TableData from "../TableData";
import AuctionEndingIn from "./AuctionEndingIn";
import CurrentPrice from "./CurrentPrice";

import { IAuction } from "../../types/auction.type";
import "./AuctionInfo.scss";

export default class AuctionInfo extends React.Component<IAuction> {
  state = {
    auctionEnded: false
  };

  endAuction = () => {
    this.setState({ auctionEnded: true });
  };

  render() {
    const { title, startingBid, currentMaxBid, endDate } = this.props;
    const { auctionEnded } = this.state;
    return (
      <>
        <div className="auction-title">{title}</div>
        <TableData value={startingBid + " CHF"} title="Starting Bid" />
        <TableData value={currentMaxBid + " CHF"} title="Current Bid" />
        <AuctionEndingIn auctionEnded={auctionEnded} endDate={endDate} />
        <CurrentPrice
          endAuction={this.endAuction}
          endDate={endDate}
          startingBid={startingBid}
          currentMaxBid={currentMaxBid}
        />
      </>
    );
  }
}
