using Dragon.Domain.Models;
using System.Collections.Generic;

namespace Dragon.Infrastructure.Mappers.Contracts
{
    public interface ISaleRowMapper
    {
        Sale Convert(IList<object> source);
        IList<object> Convert(Sale source);
    }
}
