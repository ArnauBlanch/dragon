using Dragon.Application.Services.Contracts;
using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using Dragon.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Application.Services.Implementations
{
    public class BookAppService : IBookAppService
    {
        private readonly IInventoryRepository inventoryRepository;
        private readonly ISalesRepository salesRepository;

        public BookAppService(
            IInventoryRepository inventoryRepository,
            ISalesRepository salesRepository)
        {
            this.inventoryRepository = inventoryRepository;
            this.salesRepository = salesRepository;
        }

        public async Task<Book> GetAsync(string shop, int isbn)
        {
            var result = await this.inventoryRepository.GetByISBNAsync(shop, isbn);
            return result;
        }

        public async Task<IList<Book>> GetAllAsync(string shop)
        {
            var result = await this.inventoryRepository.GetAllAsync(shop);
            return result;
        }

        public async Task<Book> CreateAsync(string shop, Book book)
        {
            var result = await this.inventoryRepository.CreateAsync(shop, book);
            return result;
        }

        public async Task<Book> UpdateAsync(string shop, Book book)
        {
            var result = await this.inventoryRepository.UpdateAsync(shop, book);
            return result;
        }

        public async Task<bool> DeleteAsync(string shop, int isbn)
        {
            var inventoryResult = await this.inventoryRepository.DeleteAsync(shop, isbn);
            var salesResult = await this.salesRepository.DeleteAsync(shop, isbn);

            var result = inventoryResult && salesResult;
            return result;
        }
    }
}
