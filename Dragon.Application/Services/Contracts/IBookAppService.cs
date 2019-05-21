using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Application.Services.Contracts
{
    public interface IBookAppService
    {
        Task<IList<Book>> GetAllAsync(string shop);
        Task<Book> GetAsync(string shop, int isbn);
        Task<Book> CreateAsync(string shop, Book book);
        Task<Book> UpdateAsync(string shop, Book book);
        Task<bool> DeleteAsync(string shop, int isbn);
    }
}
