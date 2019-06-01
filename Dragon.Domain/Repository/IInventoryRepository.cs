using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Domain.Repository
{
    public interface IInventoryRepository
    {
        Task<Book> GetByISBNAsync(string shop, int isbn);
        Task<List<Book>> GetAllAsync(string shop);
        Task<Book> InsertAsync(string shop, Book book);
        Task<Book> UpdateAsync(string shop, Book book);
        Task<bool> DeleteAsync(string shop, int isbn);
        Task<bool> DeleteAsync(string shop);
        Task<OperationResult> SellByISBNAsync(string shop, int isbn);
        Task<OperationResult> UnsellByISBNAsync(string shop, int isbn);

    }
}
