using Dragon.Application.Services.Contracts;
using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using Dragon.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.Application.Services.Implementations
{
    public class SaleAppService : ISaleAppService
    {
        private readonly IInventoryRepository inventoryRepository;
        private readonly ISalesRepository salesRepository;
        public SaleAppService(
            IInventoryRepository inventoryRepository,
            ISalesRepository salesRepository)
        {
            this.inventoryRepository = inventoryRepository;
            this.salesRepository = salesRepository;
        }

        public async Task<OperationResult> CreateAsync(string shop, int isbn)
        {
            var inventoryResult = await this.inventoryRepository.SellByISBNAsync(shop, isbn);

            if (inventoryResult == OperationResult.Done)
            {
                var sale = new Sale
                {
                    ISBN = isbn,
                    Date = DateTime.UtcNow,
                    Seller = "Arnau"
                };

                var inserted = await this.salesRepository.InsertAsync(shop, sale);
                if (inserted == null)
                    throw new Exception("Sale could not be inserted");

                return OperationResult.Done;
            }
            return inventoryResult;
        }

        public async Task<OperationResult> DeleteAsync(string shop, int isbn, string date)
        {
            var result = await this.inventoryRepository.UnsellByISBNAsync(shop, isbn);

            if (result == OperationResult.Done)
            {
                var deleted = await this.salesRepository.DeleteAsync(shop, isbn, date);
                if (!deleted)
                {
                    await this.inventoryRepository.SellByISBNAsync(shop, isbn);
                    throw new Exception("Sale could not be deleted");
                }   
            }

            return result;
        }

        public async Task<IList<Sale>> GetAllAsync(string shop)
        {
            var result = await this.salesRepository.GetAllAsync(shop);
            return result;
        }

        public async Task<IList<Sale>> GetByISBNAsync(string shop, int isbn)
        {
            var result = await this.salesRepository.GetByISBNAsync(shop, isbn);
            return result;
        }
    }
}
