using Dragon.Application.Services.Contracts;
using Dragon.Domain.Models;
using Dragon.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Application.Services.Implementations
{
    public class BookAppService : IBookAppService
    {
        private readonly IBookRepository bookRepository;
        private readonly ISaleRepository salesRepository;

        public BookAppService(
            IBookRepository bookRepository,
            ISaleRepository salesRepository)
        {
            this.bookRepository = bookRepository ?? throw new ArgumentNullException(nameof(bookRepository));
            this.salesRepository = salesRepository ?? throw new ArgumentNullException(nameof(salesRepository));
        }

        public async Task<Book> GetAsync(string shop, long isbn)
        {
            var result = await this.bookRepository.GetByISBNAsync(shop, isbn);
            return result;
        }

        public async Task<IList<Book>> GetAllAsync(string shop)
        {
            var result = await this.bookRepository.GetAllAsync(shop);
            return result;
        }

        public async Task<Book> CreateAsync(string shop, Book book)
        {
            var result = await this.bookRepository.InsertAsync(shop, book);
            return result;
        }

        public async Task<Book> UpdateAsync(string shop, Book book)
        {
            var result = await this.bookRepository.UpdateAsync(shop, book);
            return result;
        }

        public async Task<bool> DeleteAsync(string shop, long isbn)
        {
            var inventoryResult = await this.bookRepository.DeleteAsync(shop, isbn);
            var salesResult = await this.salesRepository.DeleteAsync(shop, isbn);

            var result = inventoryResult && salesResult;
            return result;
        }
    }
}
