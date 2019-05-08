using Dragon.Domain.Models;
using System.Collections.Generic;

namespace Dragon.Infrastructure.Mappers.Contracts
{
    public interface IBookRowMapper
    {
        Book Convert(IList<object> source);
        IList<object> Convert(Book source);
    }
}
