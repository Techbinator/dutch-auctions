import React from "react";
import TableData from "../TableData";
import Countdown from "./Countdown";
import { CurrentBid } from "./CurrentBid";

import {
  calculatePriceAndStatus,
  IAuctionPriceAndStatus
} from "../../helpers/auction";

import { IAuction } from "../../types/auction.type";
import "./AuctionInfo.scss";

interface IAuctionListItemProps {
  auction: IAuction;
  noticeParent?: () => void;
}

export default class AuctionListItem extends React.Component<
  IAuctionListItemProps,
  IAuctionPriceAndStatus
> {
  constructor(props: { auction: IAuction }) {
    super(props);
    this.state = {
      ...calculatePriceAndStatus(props.auction)
    };
  }

  intervalID: any; //TODO

  componentDidMount() {
    if (!this.state.ended) {
      this.intervalID = setInterval(() => this.tick(), 1000);
    }
  }

  auctionEnd = () => {
    clearInterval(this.intervalID);
    this.props.noticeParent && this.props.noticeParent();
  };

  componentWillUnmount() {
    this.auctionEnd();
  }

  tick() {
    const priceAndStatus = calculatePriceAndStatus(this.props.auction);

    if (priceAndStatus.ended) {
      this.auctionEnd();
    }

    this.setState({
      ...priceAndStatus
    });
  }

  render() {
    const {
      auction: { title, startingBid, currentMaxBid, ownerEmail }
    } = this.props;
    return (
      <>
        <div className="auction-title">{title}</div>
        <TableData
          value={startingBid.toFixed(2) + " CHF"}
          title="Starting Bid"
        />
        <TableData
          value={<CurrentBid currentMaxBid={currentMaxBid} />}
          title="Current Bid"
        />
        <Countdown {...this.state} />
        <TableData value={`${this.state.price.toFixed(2)} CHF`} title="Price" />
        <TableData value={ownerEmail} title="Owner email" />
      </>
    );
  }
}
