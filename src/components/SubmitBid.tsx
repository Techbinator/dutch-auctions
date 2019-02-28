import * as React from "react";
import { db } from "../firebase";
import Button from "../components/Button";

import "./SubmitBid.scss";
import { IAuction } from "../types/auction.type";

interface SubmitBidProps {
  userId: string;
  userEmail?: string | null;
  auction: IAuction;
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
    const { amount } = this.state;
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
  public render() {
    const {
      auction: { currentMaxBid, startingBid }
    } = this.props;
    const { error, loading, amount } = this.state;

    return (
      <form onSubmit={this.onSubmit} className="price">
        {error && <p className="error">{error}</p>}
        <input
          type="number"
          name="amount"
          required
          value={amount || currentMaxBid || 1}
          onChange={this.onChange}
          min={currentMaxBid}
          max={startingBid}
          step="0.01"
          maxLength={9}
        />
        <Button type="primary" text={loading ? "Loading..." : "BID"} />
      </form>
    );
  }
}
