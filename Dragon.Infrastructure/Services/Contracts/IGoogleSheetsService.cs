using static Google.Apis.Sheets.v4.SpreadsheetsResource;

namespace Dragon.Infrastructure.Services.Contracts
{
    public interface IGoogleSheetsService
    {
        ValuesResource GetValuesResource();
    }
}
