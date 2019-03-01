import { IAuction } from "../types/auction.type";

export interface IAuctionPriceAndStatus {
  ended: boolean;
  price: number;
  secDiff: number;
}

export function calculatePriceAndStatus(
  auction: IAuction
): IAuctionPriceAndStatus {
  const { endDate, startingBid, currentMaxBid } = auction;
  const now = new Date();
  const diff = now.getTime() - endDate;

  const secDiff = Math.abs(Math.floor(diff / 1000));

  //if auction ended
  const isAuctionEnded = diff >= 0;
  if (isAuctionEnded) {
    const isABidSubmited = currentMaxBid >= 1;
    return {
      ended: true,
      price: isABidSubmited ? currentMaxBid : 1,
      secDiff
    };
  }

  //The price will decrease every minute by 1⁄5 of the start price
  for (let i = 1; i < 6; i++) {
    const passedSeconds = i * 60;
    const isUnderTheTimeInterval = secDiff < passedSeconds;
    if (isUnderTheTimeInterval) {
      const isUnderAMinute = i === 1;
      const value = isUnderAMinute ? 1 : (startingBid * i) / 5;
      const isBidEqualOrOverMin = currentMaxBid >= value;

      return {
        ended: isBidEqualOrOverMin,
        price: isBidEqualOrOverMin ? currentMaxBid : value,
        secDiff
      };
    }
  }

  return {
    ended: false,
    price: 1,
    secDiff
  };
}
