using Dragon.Domain.Models;
using Dragon.DataAccess.Entities;
using Dragon.DataAccess.Mappers.Contracts;

namespace Dragon.DataAccess.Mappers.Implementations
{
    public class InventoryItemEntityMapper : IInventoryItemEntityMapper
    {
        public Book Convert(InventoryItemEntity source)
        {
            if (source == null || !int.TryParse(source.RowKey, out int isbn))
                return null;

            var result = new Book
            {
                ISBN = isbn,
                Title = source.Title,
                Author = source.Author,
                CoverUrl = source.CoverUrl,
                Publisher = source.Publisher,
                Price = (float) source.Price,
                ReducedPrice = (float) source.ReducedPrice,
                TotalCopies = source.TotalCopies,
                AvailableCopies = source.AvailableCopies
            };

            return result;
        }

        public InventoryItemEntity Convert(Book source, string shop)
        {
            if (source == null)
                return null;

            var result = new InventoryItemEntity
            {
                PartitionKey = shop,
                RowKey = source.ISBN.ToString(),
                Title = source.Title,
                Author = source.Author,
                CoverUrl = source.CoverUrl,
                Publisher = source.Publisher,
                Price = source.Price,
                ReducedPrice = source.ReducedPrice,
                TotalCopies = source.TotalCopies,
                AvailableCopies = source.AvailableCopies
            };

            return result;
        }
    }
}
