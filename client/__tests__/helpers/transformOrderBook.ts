import { transformOrderBookData } from "../../src/pages/MainPage/components/OrderBook/helpers/transformOrderBook";
import { OrderBookResponse } from "../../src/api/getMarketDepth";

describe("transformOrderBookData", () => {
  it("should transform bids and asks to objects with x and y properties", () => {
    const input: OrderBookResponse = {
      timestamp: "1625812800",
      microtimestamp: "1625812800123456",
      bids: [
        [50000, 0.1],
        [49900, 0.2],
      ],
      asks: [
        [51000, 0.3],
        [51100, 0.4],
      ],
    };

    const expectedOutput = {
      bids: [
        { x: 50000, y: 0.1 },
        { x: 49900, y: 0.2 },
      ],
      asks: [
        { x: 51000, y: 0.3 },
        { x: 51100, y: 0.4 },
      ],
    };

    const result = transformOrderBookData(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should return empty bids and asks if they are empty in the input", () => {
    const input: OrderBookResponse = {
      timestamp: "1625812800",
      microtimestamp: "1625812800123456",
      bids: [],
      asks: [],
    };

    const expectedOutput = {
      bids: [],
      asks: [],
    };

    const result = transformOrderBookData(input);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle large input arrays correctly", () => {
    const input: OrderBookResponse = {
      timestamp: "1625812800",
      microtimestamp: "1625812800123456",
      bids: Array.from({ length: 1000 }, (_, i) => [50000 - i, 0.1 * i]),
      asks: Array.from({ length: 1000 }, (_, i) => [51000 + i, 0.2 * i]),
    };

    const expectedOutput = {
      bids: Array.from({ length: 1000 }, (_, i) => ({
        x: 50000 - i,
        y: 0.1 * i,
      })),
      asks: Array.from({ length: 1000 }, (_, i) => ({
        x: 51000 + i,
        y: 0.2 * i,
      })),
    };

    const result = transformOrderBookData(input);
    expect(result).toEqual(expectedOutput);
  });
});
