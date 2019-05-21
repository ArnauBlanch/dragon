using static Google.Apis.Sheets.v4.SpreadsheetsResource;

namespace Dragon.DataAccess.GoogleSheets.Services.Contracts
{
    public interface IGoogleSheetsService
    {
        ValuesResource GetValuesResource();
    }
}
