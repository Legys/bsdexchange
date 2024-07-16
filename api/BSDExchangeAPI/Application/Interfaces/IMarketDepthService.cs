using BSDExchangeAPI.Domain.Response;

namespace BSDExchangeAPI.Application.Interfaces;

public interface IMarketDepthService
{
    public Task<MarketDepthResponse> GetMarketDepthAsync(string marketPair);
}