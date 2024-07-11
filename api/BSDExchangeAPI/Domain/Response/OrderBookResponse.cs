namespace BSDExchangeAPI.Domain.Response;

public record OrderBookResponse(string Timestamp, string Microtimestamp, List<List<string>> Bids, List<List<string>> Asks);


