namespace Dragon.Serverless.Domain.Configuration
{
    public interface IAppConfiguration
    {
        string AzureStorageConnectionString { get; }
        string GoogleClientEmail { get; }
        string GoogleClientPrivateKey { get; }
    }
}
