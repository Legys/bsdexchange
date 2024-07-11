using System.Text.Json;
using BSDExchange.Domain;
using BSDExchange.Domain.Response;
using BSDExchange.Interfaces;

namespace BSDExchange.Services;

public class MarketDepthService(HttpClient httpClient): IMarketDepthService
{
    public async Task<OrderBookResponse> GetMarketDepthAsync(string marketPair)
    {
        try
        {
            string url = BitstampApiRoutes.GetOrderBookRoute(marketPair);
            var response = await httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Failed to get market depth for {marketPair}");
            }

            var data = await response.Content.ReadAsStringAsync();

            var parsed = JsonSerializer.Deserialize<OrderBookResponse>(data, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });
            
            if (parsed == null)
            {
                throw new Exception($"Failed to parse market depth for {marketPair}");
            }

            return parsed;
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to get market depth for {marketPair}", ex);
        }
    }
}