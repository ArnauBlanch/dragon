using Google.Apis.Sheets.v4.Data;
using Dragon.Domain.Models;
using Dragon.Infrastructure.Mappers.Contracts;
using Dragon.Infrastructure.Repository.Contracts;
using Dragon.Infrastructure.Services.Contracts;
using System;
using System.Collections.Generic;

namespace Dragon.Infrastructure.Repository.Implementations
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

        public bool DeleteLastByISBN(int isbn)
        {
            throw new NotImplementedException();
        }

        public List<Sale> GetByISBN(int isbn)
        {
            throw new NotImplementedException();
        }

        public bool Insert(Sale sale)
        {
            var result = default(bool);

            var range = $"{SheetName}!A2";
            var saleValues = this.saleRowMapper.Convert(sale);
            var valueRange = new ValueRange { Values = new List<IList<object>> { saleValues } };

            var appendRequest = this.sheetsService.GetValuesResource().Append(valueRange, SheetId, range);
            appendRequest.ValueInputOption = Google.Apis.Sheets.v4.SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;
            var appendResponse = appendRequest.Execute();

            if (appendResponse.Updates.UpdatedRows == 1)
                result = true;

            return result;
        }
    }
}
