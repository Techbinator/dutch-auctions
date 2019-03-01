import React from "react";
import { User } from "firebase";
import { NavLink } from "react-router-dom";

import AuctionInfo from "../components/AuctionInfo";
import NewAuction from "../components/NewAuction";
import { withAuthorization } from "../firebase/withAuthorization";
import { db } from "../firebase";
import { IAuction } from "../types/auction.type";

interface IAuctionListProps {
  authUser: User;
  currentUserAuctions: boolean;
}
interface IAuctionListState {
  auctions: IAuction[];
}
class AuctionList extends React.Component<
  IAuctionListProps,
  IAuctionListState
> {
  state = {
    auctions: []
  };
  _isMounted: boolean = false;

  componentDidMount = () => {
    this._isMounted = true;
    const { authUser, currentUserAuctions } = this.props;
    // if (authUser) {
    db.getAuctions({ authUser, currentUserAuctions }).onSnapshot(snapshot => {
      const auctions: IAuction[] = [];

      snapshot.forEach(doc => {
        const auctionData = doc.data() as IAuction;
        //since firestore does not support != we filter out users auctions on all auction page
        if (!currentUserAuctions && authUser.uid == auctionData.ownerId)
          return null;
        auctions.push({ id: doc.id, ...auctionData });
      });

      if (this._isMounted) {
        this.setState({ auctions });
      }
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { auctions } = this.state;
    const { authUser, currentUserAuctions } = this.props;
    return (
      <div className="auctionsList">
        {currentUserAuctions && <NewAuction authUser={authUser} />}
        {auctions.map((auction: IAuction) => (
          <NavLink
            key={auction.id}
            className="auction-list-item box-shadow-hover"
            exact
            to={`auction/${auction.id}`}
          >
            <div className="dummy-image" />
            <AuctionInfo auction={auction} />
          </NavLink>
        ))}
      </div>
    );
  }
}

export default withAuthorization(true)(AuctionList);
