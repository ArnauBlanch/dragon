using Dragon.Domain.Models;
using Dragon.DataAccess.Entities;
using Dragon.DataAccess.Mappers.Contracts;

namespace Dragon.DataAccess.Mappers.Implementations
{
    public class InventoryItemEntityMapper : IBookEntityMapper
    {
        public Book Convert(BookEntity source)
        {
            if (source == null || !long.TryParse(source.RowKey, out long isbn))
                return null;

            var result = new Book
            {
                ISBN = isbn,
                Title = source.Title,
                Author = source.Author,
                Category = source.Category,
                CoverUrl = source.CoverUrl,
                Publisher = source.Publisher,
                Price = (float) source.Price,
                ReducedPrice = (float) source.ReducedPrice,
                TotalCopies = source.TotalCopies,
                AvailableCopies = source.AvailableCopies
            };

            return result;
        }

        public BookEntity Convert(Book source, string shop)
        {
            if (source == null)
                return null;

            var result = new BookEntity
            {
                PartitionKey = shop,
                RowKey = source.ISBN.ToString(),
                Title = source.Title,
                Author = source.Author,
                Category = source.Category,
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
