namespace BSDExchangeAPI.Domain.Dtos;

public record MarketDepthDto(
    string Timestamp,
    string Microtimestamp,
    IEnumerable<IEnumerable<string>> Bids,
    IEnumerable<IEnumerable<string>> Asks
);