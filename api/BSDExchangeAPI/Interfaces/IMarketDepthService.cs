using BSDExchangeAPI.Domain.Response;

namespace BSDExchangeAPI.Interfaces;

public interface IMarketDepthService
{
    public Task<MarketDepthResponse> GetMarketDepthAsync(string marketPair);
}