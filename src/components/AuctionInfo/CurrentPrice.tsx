import React from "react";
import TableData from "../TableData";

interface ICurrentPriceProps {
  endDate: number;
  startingBid: number;
  currentMaxBid: number;
  endAuction: () => void;
}

interface ICurrentPriceState {
  currentPrice: number;
}

type TCalculateCurrentPrice = () => number;

export default class CurrentPrice extends React.Component<
  ICurrentPriceProps,
  ICurrentPriceState
> {
  constructor(props: ICurrentPriceProps) {
    super(props);
    this.state = {
      currentPrice: this.calculateCurrentPrice()
    };
  }

  intervalID: any;

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      currentPrice: this.calculateCurrentPrice()
    });
  }

  finishAuction = () => {
    clearInterval(this.intervalID);
    this.props.endAuction();
  };

  calculateCurrentPrice: TCalculateCurrentPrice = () => {
    const { endDate, startingBid, currentMaxBid } = this.props;
    const now = new Date();
    const diff = now.getTime() - endDate;

    const secUntilAuctionEnd = Math.abs(Math.floor(diff / 1000));

    //if auction ended
    const isAuctionEnded = diff > 0;
    if (isAuctionEnded) {
      this.finishAuction();

      const isABidSubmited = currentMaxBid >= 1;
      if (isABidSubmited) return currentMaxBid;
      return 1;
    }

    //The price will decrease every minute by 1⁄5 of the start price
    for (let i = 1; i < 6; i++) {
      const passedSeconds = i * 60;
      const isUnderTheTimeInterval = secUntilAuctionEnd < passedSeconds;
      if (isUnderTheTimeInterval) {
        const isUnderAMinute = i === 1;
        const value = isUnderAMinute ? 1 : (startingBid * i) / 5;
        const isBidEqualOrOverMin = currentMaxBid >= value;
        if (isBidEqualOrOverMin) {
          this.finishAuction();
          return currentMaxBid;
        }
        return value;
      }
    }
    return 1;
  };

  render() {
    return <TableData value={`${this.state.currentPrice} CHF`} title="Price" />;
  }
}
