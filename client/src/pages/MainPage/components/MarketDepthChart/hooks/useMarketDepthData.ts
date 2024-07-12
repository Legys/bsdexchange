import { useQuery } from "@tanstack/react-query";
import { getMarketDepth } from "@/api/getMarketDepth";

// Let's imagine user can select market pair from UI
// in a real app.
const marketPair = "btceur";

export const useMarketDepthData = () => {
  return useQuery({
    queryKey: ["marketDepth", marketPair],
    queryFn: () => getMarketDepth(marketPair),
    refetchInterval: 1000,
  });
};
