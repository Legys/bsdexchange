import { useEffect, useState } from "react";
import { useMarketDepthData } from "@/pages/MainPage/components/OrderBook/hooks/useMarketDepthData";

export const usePurchaseQuote = () => {
  const [btcAmount, setBtcAmount] = useState("");
  const [quote, setQuote] = useState<number | null>(null);
  const { data } = useMarketDepthData();

  useEffect(() => {
    if (data && btcAmount) {
      const amount = parseFloat(btcAmount);
      let totalCost = 0;
      let remainingAmount = amount;
      const sortedAsks = [...data.asks].sort((a, b) => a[0] - b[0]);

      for (const [price, quantity] of sortedAsks) {
        if (remainingAmount <= quantity) {
          totalCost += remainingAmount * price;
          break;
        } else {
          totalCost += quantity * price;
          remainingAmount -= quantity;
        }
      }

      setQuote(totalCost);
    } else {
      setQuote(null);
    }
  }, [btcAmount, data]);

  return { btcAmount, quote, setBtcAmount };
};
