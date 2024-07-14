import { useCallback, useEffect, useState } from "react";
import { format, fromUnixTime } from "date-fns";
import { useMarketDepthData } from "../OrderBook/hooks/useMarketDepthData";

export const AuditLog = () => {
  const [timestamps, setTimestamps] = useState<Map<string, string>>(new Map());
  const { data } = useMarketDepthData();

  useEffect(() => {
    if (data) {
      setTimestamps((prevTimestamps) => {
        const newTimestamps = new Map(prevTimestamps);
        newTimestamps.set(data.microtimestamp, data.timestamp);
        return newTimestamps;
      });
    }
  }, [data]);

  const getDate = useCallback((timestamp: string) => {
    const date = fromUnixTime(parseInt(timestamp));
    return format(date, "HH:mm:ss:ms");
  }, []);

  return (
    <div>
      <h1>Audit Log (Descending)</h1>
      <ul className="flex flex-col-reverse max-h-96 overflow-y-scroll border rounded">
        {Array.from(timestamps.entries()).map(([microtimestamp, timestamp]) => (
          <li
            className="m-1 p-1 px-2 rounded border bg-blue-100 size-fit"
            key={microtimestamp.toString()}
          >
            {getDate(timestamp)} - {microtimestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};
