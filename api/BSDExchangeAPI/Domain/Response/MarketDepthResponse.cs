namespace BSDExchangeAPI.Domain.Response;

public record MarketDepthResponse(
    string Timestamp,
    string Microtimestamp,
    IEnumerable<IEnumerable<decimal>> Bids,
    IEnumerable<IEnumerable<decimal>> Asks);