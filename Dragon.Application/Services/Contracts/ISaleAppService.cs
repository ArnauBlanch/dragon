using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Application.Services.Contracts
{
    public interface ISaleAppService
    {
        Task<IList<Sale>> GetAllAsync(string shop);
        Task<IList<Sale>> GetByISBNAsync(string shop, int isbn);
        Task<OperationResult> CreateAsync(string shop, int isbn, string seller);
        Task<OperationResult> DeleteAsync(string shop, int isbn, string date);

    }
}
