using Dragon.Domain.Models;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;

namespace Dragon.Serverless.API.Mappers.Contracts
{
    public interface IBookMapper
    {
        BookResponse Convert(Book source);
        Book Convert(BookRequest source);
    }
}
