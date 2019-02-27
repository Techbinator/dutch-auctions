import React from "react";
import { User } from "firebase";

import AuctionListItem from "../components/AuctionListItem";
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

    db.getAuctions({ authUser, currentUserAuctions }).onSnapshot(snapshot => {
      const auctions: IAuction[] = [];

      snapshot.forEach(doc => {
        const auctionData = doc.data() as IAuction;
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
      <>
        <div className="auctionsList">
          {currentUserAuctions && <NewAuction authUser={authUser} />}
          {auctions.map((auction: IAuction) => (
            <AuctionListItem key={auction.id} {...auction} />
          ))}
        </div>
      </>
    );
  }
}

export default withAuthorization(true)(AuctionList);
