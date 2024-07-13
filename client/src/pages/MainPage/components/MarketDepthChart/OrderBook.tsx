import { useMarketDepthData } from "@/pages/MainPage/components/MarketDepthChart/hooks/useMarketDepthData";
import { useMemo } from "react";
import { transformOrderBookData } from "@/pages/MainPage/components/MarketDepthChart/helpers/transformOrderBook";
import { MarketDepthHighchart } from "@/components/MarketDepthHighchart/MarketDepthHighchart";

export const OrderBook = () => {
  const { data, isLoading } = useMarketDepthData();

  const depthData = useMemo(() => {
    if (!data) {
      return null;
    }

    return transformOrderBookData(data);
  }, [data]);

  if (isLoading || depthData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>BTC/EUR Market Depth Chart</h1>
      <MarketDepthHighchart bids={depthData.bids} asks={depthData.asks} />
    </div>
  );
};
