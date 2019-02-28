import React from "react";
import { User } from "firebase";
import { RouteComponentProps } from "react-router-dom";

import Bids from "../components/Bids";
import { withAuthorization } from "../firebase/withAuthorization";
import { IAuction, IBid } from "../types/auction.type";
import { db } from "../firebase";
import AuctionInfo from "../components/AuctionInfo";
import SubmitBid from "../components/SubmitBid";

import "./Auction.scss";

interface IAuctionProps {
  authUser: User;
}
interface IAuctionState {
  auction: IAuction | null;
  bids: IBid[];
}

class Auction extends React.Component<
  IAuctionProps & RouteComponentProps<{ id: string }>
> {
  state: IAuctionState = {
    auction: null,
    bids: []
  };

  _isMounted: boolean = false;

  getAuctionData = () => {
    const { history, match } = this.props;
    db.getAuction({ id: match.params.id }).onSnapshot(doc => {
      if (doc.exists) {
        const auctionData = doc.data() as IAuction;
        const auction = { ...auctionData, id: doc.id };
        this.setState({ auction });
        return;
      }
      //in case of wrong auction id
      history.push("/my_auctions");
    });
  };

  getBidsData = () => {
    const { match } = this.props;
    db.getBidsById({ id: match.params.id }).onSnapshot(snapshot => {
      const bids: IBid[] = [];

      snapshot.forEach(doc => {
        const auctionData = doc.data() as IBid;
        bids.push({ id: doc.id, ...auctionData });
      });

      if (this._isMounted) {
        this.setState({ bids });
      }
    });
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.getAuctionData();
    this.getBidsData();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { auction, bids } = this.state;
    const { authUser } = this.props;
    return (
      <div className="auction">
        <div className="top">
          <div className="left-container box-shadow">
            <div className="dummy-image" />
          </div>
          <div className="right-container">
            {auction ? <AuctionInfo auction={auction} /> : "Loading..."}
            {auction ? (
              <SubmitBid
                userId={authUser.uid}
                userEmail={authUser.email}
                auction={auction}
              />
            ) : (
              "Loading..."
            )}
          </div>
        </div>
        <div className="bottom">
          <Bids bids={bids} />
        </div>
      </div>
    );
  }
}

export default withAuthorization(true)(Auction);
