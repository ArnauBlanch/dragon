using Dragon.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Domain.Repository
{
    public interface ISaleRepository
    {
        Task<IList<Sale>> GetAllAsync(string shop);
        Task<IList<Sale>> GetByISBNAsync(string shop, long isbn);
        Task<Sale> InsertAsync(string shop, Sale sale);
        Task<bool> DeleteAsync(string shop, long isbn, DateTime date);
        Task<bool> DeleteAsync(string shop, long isbn);
        Task<bool> DeleteAsync(string shop);
    }
}
