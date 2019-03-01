import * as React from "react";
import { db } from "../firebase";
import Button from "../components/Button";

import "./SubmitBid.scss";
import { IAuction } from "../types/auction.type";
import { calculatePriceAndStatus } from "../helpers/auction";

interface SubmitBidProps {
  userId: string;
  userEmail?: string | null;
  auction: IAuction;
  auctionEnded: boolean;
}

interface ISubmitBidState {
  amount: number;
  loading: boolean;
  error: string;
}

const INITIAL_STATE = {
  amount: 0,
  loading: false,
  error: ""
};

export default class SubmitBid extends React.Component<
  SubmitBidProps,
  ISubmitBidState
> {
  state = INITIAL_STATE;

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //make typescript happy
    switch (event.target.name) {
      case "amount":
        this.setState({ amount: parseFloat(event.target.value) });
        break;
    }
  };
  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ loading: true });
    const amount = this.state.amount ? this.state.amount : 1;
    const { userId, userEmail, auction } = this.props;
    const auctionId = auction.id;
    const data = { amount, userId, userEmail, auctionId };
    db.submitBid(data)
      .then(() => {
        const auctionBidData = { amount, auctionId };
        db.submitBidToAuction(auctionBidData)
          .then(() => {
            this.setState({ ...INITIAL_STATE, amount });
          })
          .catch((error: Error) => {
            this.setState({ error: error.message, loading: false });
          });
      })
      .catch((error: Error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  isSameUser = () => {
    return this.props.auction.ownerId === this.props.userId;
  };

  public render() {
    const {
      auction: { currentMaxBid },
      auctionEnded
    } = this.props;
    const priceAndStatus = calculatePriceAndStatus(this.props.auction);

    const { error, loading, amount } = this.state;
    const disableInput =
      this.isSameUser() || priceAndStatus.ended || auctionEnded;

    return (
      <form onSubmit={this.onSubmit} className="price">
        {error && <p className="error">{error}</p>}
        <input
          disabled={disableInput}
          type="number"
          name="amount"
          required
          value={amount || currentMaxBid || 1}
          onChange={this.onChange}
          min={currentMaxBid}
          max={priceAndStatus.price}
          step="0.01"
          maxLength={9}
        />
        <Button
          disabled={disableInput}
          type="primary"
          text={loading ? "Loading..." : "BID"}
        />
      </form>
    );
  }
}
