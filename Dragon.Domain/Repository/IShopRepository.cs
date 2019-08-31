using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Domain.Repository
{
    public interface IShopRepository
    {
        Task<IList<Shop>> GetAllAsync(bool? isActive);
        Task<Shop> GetAsync(string id);
        Task<Shop> InsertAsync(Shop shop);
        Task<Shop> UpdateAsync(Shop shop);
        Task<bool> DeleteAsync(string id);
        Task<OperationResult> ActivateAsync(string id, bool force);
        Task<bool> DeactivateAsync(string id);
    }
}
