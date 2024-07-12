namespace BSDExchangeAPI.Domain.Settings;

public record CorsSettings(string[] AllowedOrigins, bool AllowAnyHeader, bool AllowAnyMethod);

public static class CorsSettingsExtensions
{
    public static IServiceCollection AddCustomCors(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<CorsSettings>(configuration.GetSection("CorsSettings"));
        var corsSettings = configuration.GetSection("CorsSettings").Get<CorsSettings>();
        if (corsSettings == null) throw new Exception("CorsSettings not found in appsettings.json");

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.WithOrigins(corsSettings.AllowedOrigins);

                if (corsSettings.AllowAnyHeader) policy.AllowAnyHeader();

                if (corsSettings.AllowAnyMethod) policy.AllowAnyMethod();
            });
        });

        return services;
    }
}