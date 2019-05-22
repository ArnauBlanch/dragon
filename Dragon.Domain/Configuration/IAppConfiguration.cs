namespace Dragon.Serverless.Domain.Configuration
{
    public interface IAppConfiguration
    {
        string EnvironmentSuffix { get; }
        string AzureStorageConnectionString { get; }
        // string GoogleClientEmail { get; }
        // string GoogleClientPrivateKey { get; }
    }
}
