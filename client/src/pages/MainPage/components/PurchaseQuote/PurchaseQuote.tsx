import React from "react";
import { usePurchaseQuote } from "@/pages/MainPage/components/PurchaseQuote/hooks/usePurchaseQuote";

export const PurchaseQuote = () => {
  const { quote, btcAmount, setBtcAmount } = usePurchaseQuote();

  return (
    <div>
      <input
        type="number"
        value={btcAmount}
        onChange={(e) => setBtcAmount(e.target.value)}
        placeholder="Enter BTC amount"
      />
      {quote !== null && (
        <div>
          <h2>Quote for your purchase:</h2>
          <p>{quote.toFixed(2)} EUR</p>
        </div>
      )}
    </div>
  );
};
