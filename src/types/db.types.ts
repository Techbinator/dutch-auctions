import { User } from "firebase";

export interface ICreateNewAuction {
  title: string;
  startingBid: number;
  ownerId: string;
  ownerEmail: string | null;
}
export interface IGetAuctions {
  authUser: User;
  currentUserAuctions: boolean;
}

export interface ISubmitBid {
  amount: number;
  userId: string;
  userEmail?: string | null;
  auctionId: string;
}

export interface ISubmitBidToAuction {
  amount: number;
  auctionId: string;
}
