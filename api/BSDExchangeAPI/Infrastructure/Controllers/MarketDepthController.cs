using BSDExchangeAPI.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BSDExchangeAPI.Infrastructure.Controllers;

[Route("api/market-depth")]
[ApiController]
public class MarketDepthController(IMarketDepthService marketDepthService) : ControllerBase
{
    [HttpGet("{marketPair}")]
    public async Task<IActionResult> GetBtcEurMarketDepth(string marketPair = "btceur")
    {
        var result = await marketDepthService.GetMarketDepthAsync(marketPair);

        return Ok(result);
    }
}