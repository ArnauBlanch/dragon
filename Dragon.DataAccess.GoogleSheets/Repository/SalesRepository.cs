using Google.Apis.Sheets.v4.Data;
using Dragon.Domain.Models;
using Dragon.DataAccess.Mappers.Contracts;
using Dragon.DataAccess.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dragon.Domain.Repository;

namespace Dragon.DataAccess.Repository.Implementations.GoogleSheets
{
    public class SalesRepository : ISalesRepository
    {
        const string SheetId = "1V55gn_bv9C4ZQl6DVAU5nn8JPXWG7kBrhwFlkONCiWE";
        const string SheetName = "Sales";

        private readonly IGoogleSheetsService sheetsService;
        private readonly ISaleRowMapper saleRowMapper;

        public SalesRepository(
            IGoogleSheetsService sheetsService,
            ISaleRowMapper saleRowMapper)
        {
            this.sheetsService = sheetsService;
            this.saleRowMapper = saleRowMapper;
        }

        public async Task<bool> DeleteLastByISBNAsync(int isbn)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Sale>> GetByISBNAsync(int isbn)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> InsertAsync(Sale sale)
        {
            var result = default(bool);

            var range = $"{SheetName}!A2";
            var saleValues = this.saleRowMapper.Convert(sale);
            var valueRange = new ValueRange { Values = new List<IList<object>> { saleValues } };

            var appendRequest = this.sheetsService.GetValuesResource().Append(valueRange, SheetId, range);
            appendRequest.ValueInputOption = Google.Apis.Sheets.v4.SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;
            var appendResponse = await appendRequest.ExecuteAsync();

            if (appendResponse.Updates.UpdatedRows == 1)
                result = true;

            return result;
        }
    }
}
