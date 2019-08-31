using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Application.Services.Contracts
{
    public interface IShopAppService
    {
        Task<IList<Shop>> GetAllAsync(bool? isActive);
        Task<Shop> GetByIdAsync(string id);
        Task<Shop> CreateAsync(Shop shop);
        Task<Shop> UpdateAsync(Shop shop);
        Task<bool> DeleteAsync(string id);
        Task<OperationResult> ActivateAsync(string id, bool force = false);
        Task<bool> DeactivateAsync(string id);
    }
}
