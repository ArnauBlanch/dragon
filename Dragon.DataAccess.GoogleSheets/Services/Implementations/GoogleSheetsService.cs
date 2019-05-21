using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Dragon.DataAccess.GoogleSheets.Services.Contracts;
using static Google.Apis.Sheets.v4.SpreadsheetsResource;
using Dragon.Serverless.Domain.Configuration;

namespace Dragon.DataAccess.GoogleSheets.Services.Implementations
{
    public class GoogleSheetsService : IGoogleSheetsService
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };
        private readonly SheetsService sheetsService;
        private readonly IAppConfiguration configuration;

        public GoogleSheetsService(IAppConfiguration configuration)
        {
            this.configuration = configuration;
            this.GetCredentials();
            this.sheetsService = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = this.GetCredentials(),
                ApplicationName = "TestCauApp"
            });
        }

        private ServiceAccountCredential GetCredentials()
        {
            var initializer = new ServiceAccountCredential.Initializer(configuration.GoogleClientEmail);
            initializer.Scopes = Scopes;

            var result = new ServiceAccountCredential(initializer.FromPrivateKey(configuration.GoogleClientPrivateKey));
            return result;
        }

        public ValuesResource GetValuesResource() => this.sheetsService.Spreadsheets.Values;
    }
}
