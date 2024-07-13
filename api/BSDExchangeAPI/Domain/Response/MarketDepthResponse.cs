namespace BSDExchangeAPI.Domain.Response;

public record MarketDepthResponse(
    string Timestamp,
    string Microtimestamp,
    List<List<decimal>> Bids,
    List<List<decimal>> Asks);