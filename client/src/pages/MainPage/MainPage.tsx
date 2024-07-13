"use client";

import { OrderBook } from "@/pages/MainPage/components/MarketDepthChart/OrderBook";

export const MainPage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <OrderBook />
    </div>
  );
};
