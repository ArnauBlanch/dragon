using Dragon.Serverless.Domain.Configuration;
using Microsoft.Extensions.Configuration;
using System;

namespace Dragon.Serverless.API.Configuration
{
    public class AppConfiguration : IAppConfiguration
    {
        private readonly IConfiguration configuration;
        public AppConfiguration()
        {
            this.configuration = new ConfigurationBuilder()
            .SetBasePath(Environment.CurrentDirectory)
            .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
            .AddEnvironmentVariables()
            .Build();
        }

        public string EnvironmentSuffix => this.configuration.GetValue<string>("EnvironmentSuffix");
        public string AzureStorageConnectionString => this.configuration.GetValue<string>("AzureStorageConnectionString");

        // public string GoogleClientEmail => this.configuration.GetValue<string>("GoogleClientEmail");

        // public string GoogleClientPrivateKey => this.configuration.GetValue<string>("GoogleClientPrivateKey");
    }
}
