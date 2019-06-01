using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dragon.Application.Services.Contracts;
using Dragon.Domain.Models;
using Dragon.Domain.Repository;

namespace Dragon.Application.Services.Implementations
{
    public class ShopAppService : IShopAppService
    {
        private readonly IShopRepository shopRepository;
        private readonly ISaleRepository saleRepository;
        private readonly IBookRepository inventoryRepository;

        public ShopAppService(
            IShopRepository shopRepository,
            ISaleRepository saleRepository,
            IBookRepository inventoryRepository)
        {
            this.shopRepository = shopRepository ?? throw new ArgumentNullException(nameof(shopRepository));
            this.saleRepository = saleRepository ?? throw new ArgumentNullException(nameof(saleRepository));
            this.inventoryRepository = inventoryRepository ?? throw new ArgumentNullException(nameof(inventoryRepository));
        }

        public async Task<Shop> CreateAsync(Shop shop)
        {
            var result = await this.shopRepository.InsertAsync(shop);
            return result;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var bookResult = await this.inventoryRepository.DeleteAsync(id);
            var saleResult = await this.saleRepository.DeleteAsync(id);
            var shopResult = await this.shopRepository.DeleteAsync(id);

            var result = bookResult && saleResult && shopResult;
            return result;
        }

        public async Task<IList<Shop>> GetAllAsync()
        {
            var result = await this.shopRepository.GetAllAsync();
            return result;

        }

        public async Task<Shop> GetByIdAsync(string id)
        {
            var result = await this.shopRepository.GetAsync(id);
            return result;
        }

        public async Task<Shop> UpdateAsync(Shop shop)
        {
            var result = await this.shopRepository.UpdateAsync(shop);
            return result;
        }
    }
}
