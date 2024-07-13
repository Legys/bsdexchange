import { routes } from "@/api/routes";

export interface OrderBookResponse {
  timestamp: string;
  microtimestamp: string;
  bids: Array<[number, number]>;
  asks: Array<[number, number]>;
}

export const getMarketDepth = async (
  marketPair: string,
): Promise<OrderBookResponse> => {
  const response = await fetch(routes.marketDepth(marketPair));
  return await response.json();
};
