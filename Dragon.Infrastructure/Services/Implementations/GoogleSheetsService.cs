using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Util.Store;
using Dragon.Infrastructure.Services.Contracts;
using System;
using System.IO;
using System.Threading;
using static Google.Apis.Sheets.v4.SpreadsheetsResource;

namespace Dragon.Infrastructure.Services.Implementations
{
    public class GoogleSheetsService : IGoogleSheetsService
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };
        private readonly SheetsService sheetsService;

        public GoogleSheetsService()
        {
            this.GetCredentials();
            this.sheetsService = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = this.GetCredentials(),
                ApplicationName = "TestCauApp"
            });
        }

        private UserCredential GetCredentials()
        {
            var result = default(UserCredential);
            using (var stream = new FileStream("client_secret.json", FileMode.Open, FileAccess.Read))
            {
                string credPath = "token.json";
                result = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    Scopes,
                    "user",
                    CancellationToken.None,
                    new FileDataStore(credPath, true)).Result;
                Console.WriteLine($"Credential file saved to: {credPath}");
            }

            return result;
        }

        public ValuesResource GetValuesResource() => this.sheetsService.Spreadsheets.Values;
    }
}
