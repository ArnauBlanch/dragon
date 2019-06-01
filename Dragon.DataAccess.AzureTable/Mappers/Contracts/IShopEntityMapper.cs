using Dragon.Domain.Models;
using Dragon.DataAccess.Entities;

namespace Dragon.DataAccess.Mappers.Contracts
{
    public interface IShopEntityMapper
    {
        Shop Convert(ShopEntity source);
        ShopEntity Convert(Shop source);
    }
}
