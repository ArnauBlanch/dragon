using Dragon.Domain.Models;
using Dragon.DataAccess.Entities;

namespace Dragon.DataAccess.Mappers.Contracts
{
    public interface ISaleEntityMapper
    {
        Sale Convert(SaleEntity source);
        SaleEntity Convert(Sale source, string shop);
    }
}
