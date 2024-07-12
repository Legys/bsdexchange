import { routes } from "@/api/routes";

export interface OrderBookResponse {
  timestamp: string;
  microtimestamp: string;
  bids: Array<Array<string>>;
  asks: Array<Array<string>>;
}

export const getMarketDepth = async (
  marketPair: string,
): Promise<OrderBookResponse> => {
  const response = await fetch(routes.marketDepth(marketPair));
  return await response.json();
};
