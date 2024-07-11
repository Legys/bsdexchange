using BSDExchange.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BSDExchange.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MarketDepthController(IMarketDepthService marketDepthService): ControllerBase
{

    [HttpGet("{marketPair}")]
    public async Task<IActionResult> GetBtcEurMarketDepth(string marketPair = "btceur")
    {
        var result = await marketDepthService.GetMarketDepthAsync(marketPair);
        
        return Ok(result);
    }
}