using Dragon.Application.Mappers.Contracts;
using Dragon.Domain.Models;
using Dragon.External.BookSpider;

namespace Dragon.Application.Mappers.Implementations
{
    public class BookInfoMapper : IBookInfoMapper
    {
        public Book Convert(Book book, BookInfo bookInfo)
        {
            if (book == null)
                return null;

            if (bookInfo == null || book.ISBN != bookInfo.ISBN)
                return book;

            var result = new Book
            {
                ISBN = book.ISBN,
                Title = string.IsNullOrWhiteSpace(bookInfo.Title) ? book.Title : bookInfo.Title,
                Author = string.IsNullOrWhiteSpace(bookInfo.Author) ? book.Author : bookInfo.Author,
                CoverUrl = string.IsNullOrWhiteSpace(bookInfo.CoverUrl) ? book.CoverUrl : bookInfo.CoverUrl,
                Publisher = string.IsNullOrWhiteSpace(bookInfo.Publisher) ? book.Publisher : bookInfo.Publisher,
                Category = book.Category,
                AvailableCopies = book.AvailableCopies,
                TotalCopies = book.TotalCopies,
                Price = book.Price,
                ReducedPrice = book.ReducedPrice
            };

            return result;
        }
    }
}
