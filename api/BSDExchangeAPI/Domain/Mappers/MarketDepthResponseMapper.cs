using System.Globalization;
using BSDExchangeAPI.Domain.Response;
using OrderBookDto = BSDExchangeAPI.Infrastructure.OrderBookResponse;

namespace BSDExchangeAPI.Domain.Mappers;

public static class MarketDepthResponseMapper
{
    private static decimal ParseDecimal(string value)
    {
        return decimal.Parse(value, CultureInfo.InvariantCulture);
    }

    public static MarketDepthResponse MapToResponse(OrderBookDto response)
    {
        return new MarketDepthResponse(
            response.Timestamp,
            response.Microtimestamp,
            response.Bids.Select(x => x.Select(ParseDecimal).ToList()).ToList(),
            response.Asks.Select(x => x.Select(ParseDecimal).ToList()).ToList()
        );
    }
}