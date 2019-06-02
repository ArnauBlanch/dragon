using Dragon.Domain.Models;
using Dragon.External.BookSpider;

namespace Dragon.Application.Mappers.Contracts
{
    public interface IBookInfoMapper
    {
        Book Convert(Book book, BookInfo bookInfo);
    }
}
