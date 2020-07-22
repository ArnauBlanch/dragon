using Dragon.DataAccess.Entities;
using Dragon.DataAccess.Mappers.Contracts;
using Dragon.Domain.Models;
using System;

namespace Dragon.DataAccess.AzureTable.Mappers.Implementations
{
    public class SaleEntityMapper : ISaleEntityMapper
    {
        public Sale Convert(SaleEntity source)
        {
            if (source == null)
                return null;

            var partitionKey = source.PartitionKey.Split('_');
            if (partitionKey.Length != 2 || !long.TryParse(partitionKey[1], out long isbn)
                || !DateTime.TryParse(source.RowKey, out DateTime date))
                return null;


            var result = new Sale
            {
                ISBN = isbn,
                Date = date.ToUniversalTime(),
                Seller = source.Seller
            };

            return result;
        }

        public SaleEntity Convert(Sale source, string shop)
        {
            if (source == null)
                return null;

            var result = new SaleEntity
            {
                PartitionKey = $"{shop}_{source.ISBN}",
                RowKey = source.Date.ToString("s"),
                Seller = source.Seller
            };

            return result;
        }
    }
}
