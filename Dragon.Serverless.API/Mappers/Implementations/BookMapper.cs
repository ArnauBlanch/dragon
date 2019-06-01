using Dragon.Domain.Models;
using Dragon.Serverless.API.Mappers.Contracts;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;

namespace Dragon.Serverless.API.Mappers.Implementations
{
    public class BookMapper : IBookMapper
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
                Category = source.Category,
                Publisher = source.Publisher,
                CoverUrl = source.CoverUrl,
                Price = source.Price,
                ReducedPrice = source.ReducedPrice,
                TotalCopies = source.TotalCopies,
                AvailableCopies = source.AvailableCopies
            };

            return result;
        }

        public Book Convert(BookRequest source)
        {
            if (source == null)
                return null;

            var result = new Book
            {
                ISBN = source.ISBN,
                Title = source.Title,
                Author = source.Author,
                Category = source.Category,
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
