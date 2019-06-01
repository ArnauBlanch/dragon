using Dragon.Domain.Models;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;

namespace Dragon.Serverless.API.Mappers.Contracts
{
    public interface IShopMapper
    {
        Shop Convert(ShopRequest source);
        ShopResponse Convert(Shop source);
    }
}
