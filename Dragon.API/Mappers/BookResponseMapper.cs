using Dragon.API.Models;
using Dragon.Domain.Models;

namespace Dragon.API.Mappers
{
    public class BookResponseMapper : IBookResponseMapper
    {
        public BookResponse Convert(Book source)
        {
            if (source == null)
                return null;

            var result = new BookResponse
            {
                ISBN = source.ISBN,
                Title = source.Title,
                Author = source.Author,
                Publisher = source.Publisher,
                CoverUrl = source.CoverUrl,
                Price = source.Price,
                ReducedPrice = source.ReducedPrice,
                TotalCopies = source.TotalCopies,
                AvailableCopies = source.AvailableCopies
            };

            return result;
        }
    }
}
