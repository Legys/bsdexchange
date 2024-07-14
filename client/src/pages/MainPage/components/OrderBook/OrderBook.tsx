"use client";

import { MarketDepthHighchart } from "@/components/MarketDepthHighchart/MarketDepthHighchart";
import { AuditLog } from "@/pages/MainPage/components/AuditLog/AuditLog";
import { useMarketDepthData } from "@/pages/MainPage/components/OrderBook/hooks/useMarketDepthData";
import { transformOrderBookData } from "@/pages/MainPage/components/OrderBook/helpers/transformOrderBook";
import { useMemo } from "react";
import { PurchaseQuote } from "@/pages/MainPage/components/PurchaseQuote/PurchaseQuote";

export const OrderBook = () => {
  const query = useMarketDepthData();
  const { data, isLoading } = query;

  const depthData = useMemo(() => {
    if (!data) {
      return null;
    }

    return transformOrderBookData(data);
  }, [data]);

  if (isLoading || depthData === null) {
    return <div>Loading...</div>;
  }
  console.log("rerender");

  return (
    <div>
      <h1>BTC/EUR Market Depth Chart</h1>
      <MarketDepthHighchart bids={depthData.bids} asks={depthData.asks} />
      <div className="flex justify-between mt-5">
        <AuditLog />
        <PurchaseQuote />
      </div>
    </div>
  );
};
