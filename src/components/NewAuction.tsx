import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { User } from "firebase";
import { db } from "../firebase";
import Button from "./Button";

import "./NewAuction.scss";

interface NewAuctionProps {
  authUser: User;
}
interface INewAuctionState {
  title: string;
  startingBid: number;
  error?: string | null;
  loading: boolean;
}

const INITIAL_STATE = {
  title: "",
  startingBid: 1,
  error: null,
  loading: false
};

export default class NewAuction extends React.Component<
  NewAuctionProps,
  INewAuctionState
> {
  state = INITIAL_STATE;
  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ loading: true });

    const { title, startingBid } = this.state;
    const { authUser } = this.props;

    db.createNewAuction({ title, startingBid, ownerId: authUser.uid })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error: Error) => {
        this.setState({ error: error.message, loading: false });
      });
  };
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //make typescript happy
    switch (event.target.name) {
      case "title":
        this.setState({ title: event.target.value });
        break;
      case "startingBid":
        this.setState({ startingBid: parseFloat(event.target.value) });
        break;
    }
  };

  render() {
    const { title, startingBid, error, loading } = this.state;
    return (
      <div className="new-auction box-shadow-hover">
        <div className="icon-container">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <form onSubmit={this.onSubmit}>
          {error && <p className="error">{error}</p>}
          <input
            type="string"
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.onChange}
            required
            minLength={1}
            maxLength={50}
          />
          <input
            name="startingBid"
            value={startingBid}
            type="number"
            onChange={this.onChange}
            placeholder="Price"
            min="1"
            max="10000000"
            step="0.01"
          />
          <Button
            type="primary"
            text={loading ? "Loading..." : "New Auction"}
          />
        </form>
      </div>
    );
  }
}
