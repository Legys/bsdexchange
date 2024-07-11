using BSDExchangeAPI.Domain.Response;

namespace BSDExchangeAPI.Interfaces;

public interface IMarketDepthService
{
    public Task<OrderBookResponse> GetMarketDepthAsync(string marketPair);
}