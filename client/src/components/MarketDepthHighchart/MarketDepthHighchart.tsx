import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";
import {
  getHighchartsOptions,
  PlotData,
} from "@/components/MarketDepthHighchart/highchartsOptions";

interface IMarketDepthHighchartProps {
  bids: PlotData[];
  asks: PlotData[];
}

export const MarketDepthHighchart = ({
  bids,
  asks,
}: IMarketDepthHighchartProps) => {
  const options = useMemo(() => {
    return getHighchartsOptions({
      bids,
      asks,
    });
  }, [bids, asks]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
