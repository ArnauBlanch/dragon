using Dragon.DataAccess.Entities;
using Dragon.DataAccess.Mappers.Contracts;
using Dragon.Domain.Models;

namespace Dragon.DataAccess.AzureTable.Mappers.Implementations
{
    public class ShopEntityMapper : IShopEntityMapper
    {
        public Shop Convert(ShopEntity source)
        {
            if (source == null)
                return null;

            var result = new Shop
            {
                Id = source.RowKey,
                Name = source.Name,
                IsActive = source.IsActive,
                Description = source.Description
            };

            return result;
        }

        public ShopEntity Convert(Shop source)
        {
            if (source == null)
                return null;

            var result = new ShopEntity
            {
                PartitionKey = "shops",
                RowKey = source.Id,
                Name = source.Name,
                IsActive = source.IsActive,
                Description = source.Description
            };

            return result;
        }
    }
}
