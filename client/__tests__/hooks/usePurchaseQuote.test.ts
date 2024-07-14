import * as useMarketDepthDataModule from "../../src/pages/MainPage/components/OrderBook/hooks/useMarketDepthData";
import { act, renderHook } from "@testing-library/react";
import { OrderBookResponse } from "@/api/getMarketDepth";
import { usePurchaseQuote } from "../../src/pages/MainPage/components/PurchaseQuote/hooks/usePurchaseQuote";

jest.mock(
  "../../src/pages/MainPage/components/OrderBook/hooks/useMarketDepthData",
);
const mockedUseMarketDepthDataModule = useMarketDepthDataModule as jest.Mocked<
  typeof useMarketDepthDataModule
>;

describe("usePurchaseQuote", () => {
  const mockData: OrderBookResponse = {
    timestamp: "123",
    microtimestamp: "1234567890",
    bids: [
      [80, 1],
      [70, 1],
    ],
    asks: [
      [100, 1],
      [200, 0.5],
    ],
  };

  const mockSWRResponse = {
    data: mockData,
    error: undefined,
    mutate: jest.fn(),
    isValidating: false,
    isLoading: false,
  };

  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseMarketDepthDataModule.useMarketDepthData.mockReturnValue(
      mockSWRResponse,
    );
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => usePurchaseQuote());
    expect(result.current.btcAmount).toBe("");
    expect(result.current.quote).toBeNull();
  });

  it("should calculate quote correctly with data", () => {
    const { result } = renderHook(() => usePurchaseQuote());

    act(() => {
      result.current.setBtcAmount("1.5");
    });

    expect(result.current.quote).toBe(200); // (1 * 100) + (0.5 * 200)
  });

  it("should set quote to null when btcAmount is empty", () => {
    mockedUseMarketDepthDataModule.useMarketDepthData.mockReturnValue({
      ...mockSWRResponse,
      data: {
        ...mockData,
        asks: [[100, 1]],
      },
    });

    const { result } = renderHook(() => usePurchaseQuote());

    act(() => {
      result.current.setBtcAmount("");
    });

    expect(result.current.quote).toBeNull();
  });

  it("should handle no data scenario", () => {
    mockedUseMarketDepthDataModule.useMarketDepthData.mockReturnValue({
      ...mockSWRResponse,
      data: undefined,
    });

    const { result } = renderHook(() => usePurchaseQuote());

    act(() => {
      result.current.setBtcAmount("1");
    });

    expect(result.current.quote).toBeNull();
  });
});
