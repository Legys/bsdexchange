import { getMarketDepth } from "@/api/getMarketDepth";
import useSWR from "swr";

// Let's imagine user can select market pair from UI
// in a real app.
const marketPair = "btceur";

export const useMarketDepthData = () => {
  return useSWR(
    ["marketDepth", marketPair],
    async () => getMarketDepth(marketPair),
    {
      refreshInterval: 2000,
    },
  );
};
