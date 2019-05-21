using Dragon.Domain.Models;
using Dragon.DataAccess.GoogleSheets.Mappers.Contracts;
using System;
using System.Collections.Generic;
using Dragon.DataAccess.GoogleSheets.Repository.Columns;

namespace Dragon.DataAccess.GoogleSheets.Mappers.Implementations
{
    public class SaleRowMapper : ISaleRowMapper
    {
        public Sale Convert(IList<object> source)
        {
            throw new NotImplementedException();
        }

        public IList<object> Convert(Sale source)
        {
            if (source == null)
                return null;

            var result = new List<object>();

            for (int i = 0; i < SaleColumns.NUM_COLUMNS; ++i) result.Add(null);

            result[SaleColumns.ISBN] = source.ISBN;
            result[SaleColumns.Date] = source.Date.ToUniversalTime().ToString();
            result[SaleColumns.Seller] = source.Seller;

            return result;
        }
    }
}
