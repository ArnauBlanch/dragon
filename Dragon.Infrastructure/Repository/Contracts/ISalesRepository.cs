using Dragon.Domain.Models;
using System.Collections.Generic;

namespace Dragon.Infrastructure.Repository.Contracts
{
    public interface ISalesRepository
    {
        List<Sale> GetByISBN(int isbn);
        bool Insert(Sale sale);
        bool DeleteLastByISBN(int isbn);
    }
}
