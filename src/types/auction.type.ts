export interface IAuction {
  id: string;
  title: string;
  startDate: number;
  endDate: number;
  ownerId: string;
  ownerEmail: string;
  startingBid: number;
  currentMaxBid: number;
}

export interface IBid {
  id: string;
  amount: number;
  auctionId: string;
  createdAt: number;
  userEmail: string;
}
