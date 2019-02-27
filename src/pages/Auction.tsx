import React from "react";
import { User } from "firebase";
import { RouteComponentProps } from "react-router-dom";

import Bids from "../components/Bids";
import { withAuthorization } from "../firebase/withAuthorization";
import { IAuction } from "../types/auction.type";
import { db } from "../firebase";
import AuctionInfo from "../components/AuctionInfo";

import "./Auction.scss";

interface IAuctionProps {
  authUser: User;
}
interface IAuctionState {
  auction: IAuction | null;
}

class Auction extends React.Component<
  IAuctionProps & RouteComponentProps<{ id: string }>,
  IAuctionState
> {
  state = {
    auction: null
  };

  _isMounted: boolean = false;

  componentDidMount = () => {
    this._isMounted = true;
    const { history, match } = this.props;

    db.getAuction({ id: match.params.id }).onSnapshot(doc => {
      if (doc.exists) {
        const auction = doc.data() as IAuction;
        this.setState({ auction });
        return;
      }
      //in case of wrong auction id
      history.push("/my_auctions");
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { auction } = this.state;

    return (
      <div className="auction">
        <div className="top">
          <div className="left-container box-shadow">
            <div className="dummy-image" />
          </div>
          <div className="right-container">
            {auction ? <AuctionInfo {...auction} /> : "Loading..."}
            <form className="price">
              <input
                type="number"
                min="1"
                max="10000000"
                step="0.01"
                maxLength={9}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className="bottom">
          <Bids />
        </div>
      </div>
    );
  }
}

export default withAuthorization(true)(Auction);
