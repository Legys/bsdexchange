using BSDExchangeAPI.Application.Interfaces;
using BSDExchangeAPI.Application.Services;
using BSDExchangeAPI.Domain.Settings;
using BSDExchangeAPI.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.Services.AddHttpClient<BitstampHttpClient>(client =>
{
    client.BaseAddress = new Uri("https://www.bitstamp.net/");
});

builder.Services.AddCustomCors(configuration);

// Services
builder.Services.AddTransient<IMarketDepthService, MarketDepthService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();