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
  if (authUser && currentUserAuctions) {
    auctions = auctions.where(
      "ownerId",
      "==",
      authUser.uid
    ) as firestore.CollectionReference;
  }

  return auctions;
};

export const getAuction = ({ id }: { id: string }) => {
  return db.collection("auctions").doc(id);
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
    maxBidderId: ""
  };
  return db.collection("auctions").add(auction);
};
