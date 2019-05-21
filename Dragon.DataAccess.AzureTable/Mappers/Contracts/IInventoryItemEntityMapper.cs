using Dragon.Domain.Models;
using Dragon.DataAccess.Entities;

namespace Dragon.DataAccess.Mappers.Contracts
{
    public interface IInventoryItemEntityMapper
    {
        Book Convert(InventoryItemEntity source);
        InventoryItemEntity Convert(Book source, string shop);
    }
}
