using Dragon.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Domain.Repository
{
    public interface IShopRepository
    {
        Task<IList<Shop>> GetAllAsync();
        Task<Shop> GetAsync(string id);
        Task<Shop> InsertAsync(Shop shop);
        Task<Shop> UpdateAsync(Shop shop);
        Task<bool> DeleteAsync(string id);
    }
}
