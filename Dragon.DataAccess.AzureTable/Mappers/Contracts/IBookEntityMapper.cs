using Dragon.Domain.Models;
using Dragon.DataAccess.Entities;

namespace Dragon.DataAccess.Mappers.Contracts
{
    public interface IBookEntityMapper
    {
        Book Convert(BookEntity source);
        BookEntity Convert(Book source, string shop);
    }
}
