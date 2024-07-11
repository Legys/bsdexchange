using BSDExchange.Domain.Response;

namespace BSDExchange.Interfaces;

public interface IMarketDepthService
{
    public Task<OrderBookResponse> GetMarketDepthAsync(string marketPair);
}