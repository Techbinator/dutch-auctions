import { calculatePriceAndStatus } from "./auction";
const auction = require("../helpers/__mocks__/auctions.json")[0];

describe("AuctionHelper", () => {
  const OriginalDate = Date;
  const dateNow = new OriginalDate("01-03-2019 15:49:11");

  beforeEach(() => {
    jest.spyOn(global, "Date");
    Date.mockImplementation(() => dateNow);
  });
  it("should return auction ended if the 5 minutes are up", () => {
    const auctionEndDateInThePast = new OriginalDate(
      "01-03-2019 15:48:11"
    ).getTime();
    const auctionData = {
      ...auction,
      endDate: auctionEndDateInThePast,
      currentMaxBid: 1
    };
    const expectedResult = {
      ended: true,
      price: 1,
      secDiff: 60
    };

    expect(calculatePriceAndStatus(auctionData)).toEqual(expectedResult);
  });

  it("should return auction ended and price 1 if the 5 minutes are up and no one bided", () => {
    const dateInThePast = new OriginalDate("01-03-2019 15:48:11").getTime();
    const auctionData = {
      ...auction,
      endDate: dateInThePast,
      currentMaxBid: 0
    };
    const expectedResult = {
      ended: true,
      price: 1,
      secDiff: 60
    };

    expect(calculatePriceAndStatus(auctionData)).toEqual(expectedResult);
  });

  it("the price should be 8 after 1 minute and auction active", () => {
    const nowPlusMinus = new OriginalDate("01-03-2019 15:52:11").getTime();
    const auctionData = {
      ...auction,
      endDate: nowPlusMinus,
      currentMaxBid: 0
    };
    const expectedResult = {
      ended: false,
      price: 8,
      secDiff: 180
    };

    expect(calculatePriceAndStatus(auctionData)).toEqual(expectedResult);
  });

  it("the price should be 4 after 3 minutes and auction active", () => {
    const nowPlusMinus = new OriginalDate("01-03-2019 15:50:11").getTime();
    const auctionData = {
      ...auction,
      endDate: nowPlusMinus,
      currentMaxBid: 0
    };
    const expectedResult = {
      ended: false,
      price: 4,
      secDiff: 60
    };

    expect(calculatePriceAndStatus(auctionData)).toEqual(expectedResult);
  });

  it("the price should be 1 and auction active in the last minute", () => {
    const nowPlusMinus = new OriginalDate("01-03-2019 15:49:17").getTime();
    const auctionData = {
      ...auction,
      endDate: nowPlusMinus,
      currentMaxBid: 0
    };
    const expectedResult = {
      ended: false,
      price: 1,
      secDiff: 6
    };

    expect(calculatePriceAndStatus(auctionData)).toEqual(expectedResult);
  });

  it("should end the auction in case the current max bid meets the min price", () => {
    const nowPlusMinus = new OriginalDate("01-03-2019 15:52:03").getTime();
    const auctionData = {
      ...auction,
      endDate: nowPlusMinus,
      currentMaxBid: 7
    };
    const expectedResult = {
      ended: true,
      price: 7,
      secDiff: 172
    };

    expect(calculatePriceAndStatus(auctionData)).toEqual(expectedResult);
  });

  it("should return default in case no other condition is met", () => {
    const nowPlusMinus = new OriginalDate("01-03-2019 15:54:11").getTime();
    const auctionData = {
      ...auction,
      endDate: nowPlusMinus,
      currentMaxBid: 0
    };
    const expectedResult = {
      ended: false,
      price: 1,
      secDiff: 300
    };

    expect(calculatePriceAndStatus(auctionData)).toEqual(expectedResult);
  });
});
