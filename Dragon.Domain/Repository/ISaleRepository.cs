using Dragon.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Domain.Repository
{
    public interface ISaleRepository
    {
        Task<IList<Sale>> GetAllAsync(string shop);
        Task<IList<Sale>> GetByISBNAsync(string shop, int isbn);
        Task<Sale> InsertAsync(string shop, Sale sale);
        Task<bool> DeleteAsync(string shop, int isbn, string date);
        Task<bool> DeleteAsync(string shop, int isbn);
        Task<bool> DeleteAsync(string shop);
    }
}
