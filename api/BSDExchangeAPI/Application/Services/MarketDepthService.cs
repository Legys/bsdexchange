using BSDExchangeAPI.Application.Interfaces;
using BSDExchangeAPI.Domain.Mappers;
using BSDExchangeAPI.Domain.Response;
using BSDExchangeAPI.Infrastructure;

namespace BSDExchangeAPI.Application.Services;

public class MarketDepthService(BitstampHttpClient bitstampHttpClient) : IMarketDepthService
{
    private static readonly (int, int) DefaultLimitRange = (1_000, 100_000);

    public async Task<MarketDepthResponse> GetMarketDepthAsync(string marketPair)
    {
        try
        {
            var data = await bitstampHttpClient.GetOrderBookAsync(marketPair);

            if (data is null) throw new Exception($"Failed to get market depth for {marketPair}");

            var mapped = MarketDepthResponseMapper.MapToResponse(data);
            var filtered = LimitMarketDepth(mapped, DefaultLimitRange);

            return filtered;
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to get market depth for {marketPair}", ex);
        }
    }

    private static MarketDepthResponse LimitMarketDepth(MarketDepthResponse marketDepth, (int, int) limitRange)
    {
        return new MarketDepthResponse(
            marketDepth.Timestamp,
            marketDepth.Microtimestamp,
            marketDepth.Bids.Where(b => b.First() >= limitRange.Item1),
            marketDepth.Asks.Where(a => a.First() <= limitRange.Item2)
        );
    }
}