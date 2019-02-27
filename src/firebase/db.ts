import { db } from "./config";
import { User, firestore } from "firebase";

interface IGetAuctions {
  authUser: User;
  currentUserAuctions: boolean;
}
export const getAuctions = ({
  authUser,
  currentUserAuctions
}: IGetAuctions) => {
  let auctions = db.collection("auctions").orderBy("endDate", "desc");
  console.log("here");
  if (authUser && currentUserAuctions) {
    auctions = auctions.where(
      "ownerId",
      "==",
      authUser.uid
    ) as firestore.CollectionReference;
  }

  return auctions;
};

interface ICreateNewAuction {
  title: string;
  startingBid: number;
  ownerId: string;
}

export const createNewAuction = (data: ICreateNewAuction) => {
  var startDate = new Date();
  var endDate = new Date();
  endDate.setMinutes(endDate.getMinutes() + 5);
  const auction = {
    title: data.title,
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
    startingBid: data.startingBid,
    ownerId: data.ownerId,
    currentMaxBid: 0,
    maxBidder: {
      email: "",
      Id: ""
    }
  };
  return db.collection("auctions").add(auction);
};
