namespace BSDExchangeAPI.Domain;

public static class BitstampApiRoutes
{
    private const string BaseUrl = "https://www.bitstamp.net/api/v2/";

    public static string GetOrderBookRoute(string marketPair) => $"{BaseUrl}order_book/{marketPair}/";
}