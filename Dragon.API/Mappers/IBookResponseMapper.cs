using Dragon.API.Models;
using Dragon.Domain.Models;

namespace Dragon.API.Mappers
{
    public interface IBookResponseMapper
    {
        BookResponse Convert(Book source);
    }
}
