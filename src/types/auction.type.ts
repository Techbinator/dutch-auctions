export interface IAuction {
  id?: string;
  title: string;
  startDate: number;
  endDate: number;
  ownerId: string;
  startingBid: number;
  currentMaxBid: number;
  maxBidder: {
    id: string;
    email: string;
  };
}
