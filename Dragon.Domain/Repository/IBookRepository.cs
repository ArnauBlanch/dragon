using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Domain.Repository
{
    public interface IBookRepository
    {
        Task<Book> GetByISBNAsync(string shop, long isbn);
        Task<List<Book>> GetAllAsync(string shop);
        Task<Book> InsertAsync(string shop, Book book);
        Task<Book> UpdateAsync(string shop, Book book);
        Task<bool> DeleteAsync(string shop, long isbn);
        Task<bool> DeleteAsync(string shop);
        Task<OperationResult> SellByISBNAsync(string shop, long isbn);
        Task<OperationResult> UnsellByISBNAsync(string shop, long isbn);

    }
}
