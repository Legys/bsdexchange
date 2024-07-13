namespace BSDExchangeAPI.Domain.Dtos;

public record MarketDepthDto(
    string Timestamp,
    string Microtimestamp,
    List<List<string>> Bids,
    List<List<string>> Asks
);