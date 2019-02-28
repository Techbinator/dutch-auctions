import React from "react";
import TableData from "../TableData";
import {
  calculatePriceAndStatus,
  IAuctionPriceAndStatus
} from "../../helpers/auction";
import { IAuction } from "../../types/auction.type";

interface ICurrentPriceProps {
  auction: IAuction;
}
export default class CurrentPrice extends React.Component<
  ICurrentPriceProps,
  IAuctionPriceAndStatus
> {
  constructor(props: ICurrentPriceProps) {
    super(props);
    this.state = {
      ...calculatePriceAndStatus(props.auction)
    };
  }

  intervalID: any;

  componentDidMount() {
    if (!this.state.ended) {
      this.intervalID = setInterval(() => this.tick(), 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    const priceAndStatus = calculatePriceAndStatus(this.props.auction);
    if (priceAndStatus.ended) {
      clearInterval(this.intervalID);
    }

    this.setState({
      ...priceAndStatus
    });
  }

  render() {
    return <TableData value={`${this.state.price} CHF`} title="Price" />;
  }
}
