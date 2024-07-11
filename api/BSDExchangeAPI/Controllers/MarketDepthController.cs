using BSDExchangeAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BSDExchangeAPI.Controllers;

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