import { OrderBookResponse } from "@/api/getMarketDepth";

export const transformOrderBookData = (data: OrderBookResponse) => {
  const bids = data.bids.map(([price, amount]) => ({ x: price, y: amount }));
  const asks = data.asks.map(([price, amount]) => ({ x: price, y: amount }));
  return { bids, asks };
};
