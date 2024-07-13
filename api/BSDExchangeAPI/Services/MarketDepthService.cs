using System.Text.Json;
using BSDExchangeAPI.Domain;
using BSDExchangeAPI.Domain.Dtos;
using BSDExchangeAPI.Domain.Mappers;
using BSDExchangeAPI.Domain.Response;
using BSDExchangeAPI.Interfaces;

namespace BSDExchangeAPI.Services;

public class MarketDepthService(HttpClient httpClient) : IMarketDepthService
{
    private static readonly (int, int) DefaultLimitRange = (1_000, 100_000);

    public async Task<MarketDepthResponse> GetMarketDepthAsync(string marketPair)
    {
        try
        {
            var url = BitstampApiRoutes.GetOrderBookRoute(marketPair);
            var response = await httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode) throw new Exception($"Failed to get market depth for {marketPair}");

            var data = await response.Content.ReadAsStringAsync();

            var parsed = JsonSerializer.Deserialize<MarketDepthDto>(data, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            if (parsed == null) throw new Exception($"Failed to parse market depth for {marketPair}");

            var mapped = MarketDepthResponseMapper.MapToResponse(parsed);
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
            marketDepth.Bids.Where(b => b[0] >= limitRange.Item1).ToList(),
            marketDepth.Asks.Where(a => a[0] <= limitRange.Item2).ToList()
        );
    }
}