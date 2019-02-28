import { db } from "./config";
import { firestore } from "firebase";

import {
  IGetAuctions,
  ICreateNewAuction,
  ISubmitBid,
  ISubmitBidToAuction
} from "../types/db.types";

const AUCTIONS_COLLECTION = "auctions";
const BIDS_COLLECTION = "bids";

export const getAuctions = ({
  authUser,
  currentUserAuctions
}: IGetAuctions) => {
  let auctions = db.collection(AUCTIONS_COLLECTION).orderBy("endDate", "desc");
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
  return db.collection(AUCTIONS_COLLECTION).doc(id);
};

export const getBidsById = ({ id }: { id: string }) => {
  return db
    .collection(BIDS_COLLECTION)
    .where("auctionId", "==", id)
    .orderBy("amount", "desc")
    .orderBy("createdAt", "asc");
};

export const createNewAuction = (data: ICreateNewAuction) => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMinutes(endDate.getMinutes() + 5);
  const auction = {
    title: data.title,
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
    startingBid: data.startingBid,
    ownerId: data.ownerId,
    currentMaxBid: 0
  };
  return db.collection(AUCTIONS_COLLECTION).add(auction);
};

export const submitBid = (data: ISubmitBid) => {
  const createdAt = new Date().getTime();
  const processedData = {
    ...data,
    createdAt
  };

  return db.collection(BIDS_COLLECTION).add({ ...processedData });
};

export const submitBidToAuction = (data: ISubmitBidToAuction) => {
  return db
    .collection(AUCTIONS_COLLECTION)
    .doc(data.auctionId)
    .update({ currentMaxBid: data.amount });
};
