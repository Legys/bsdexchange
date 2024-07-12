import { useMarketDepthData } from "@/pages/MainPage/components/MarketDepthChart/hooks/useMarketDepthData";

export const MarketDepthChart = () => {
  const { data, isLoading } = useMarketDepthData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{data?.timestamp}</div>;
};
