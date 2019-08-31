using Dragon.Domain.Models;
using Dragon.Serverless.API.Mappers.Contracts;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;

namespace Dragon.Serverless.API.Mappers.Implementations
{
    public class ShopMapper : IShopMapper
    {
        public Shop Convert(ShopRequest source)
        {
            if (source == null)
                return null;

            var result = new Shop
            {
                Id = source.Id,
                Name = source.Name,
                Description = source.Description
            };

            return result;
        }

        public ShopResponse Convert(Shop source)
        {
            if (source == null)
                return null;

            var result = new ShopResponse
            {
                Id = source.Id,
                Name = source.Name,
                IsActive = source.IsActive,
                Description = source.Description
            };

            return result;
        }
    }
}
