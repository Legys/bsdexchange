export interface PlotData {
  x: number;
  y: number;
}

export const getHighchartsOptions = (data: {
  bids: PlotData[];
  asks: PlotData[];
}) => ({
  chart: {
    type: "area",
  },
  animation: false,
  title: {
    text: "BTC-EUR Market Depth",
  },
  xAxis: {
    crosshair: true,
    title: {
      text: "Price",
    },
  },
  yAxis: {
    title: {
      text: "Amount",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    area: {
      fillOpacity: 0.2,
      lineWidth: 1,
      step: "center",
    },
  },
  tooltip: {
    headerFormat:
      '<span style="font-size=10px;">Price: ' + "{point.key}</span><br/>",
    valueDecimals: 8,
  },
  series: [
    {
      name: "Asks",
      data: data.asks,
      color: "#fc5857",
      fillOpacity: 0.1,
    },
    {
      name: "Bids",
      data: data.bids,
      color: "#03a7a8",
      fillOpacity: 0.1,
    },
  ],
});
