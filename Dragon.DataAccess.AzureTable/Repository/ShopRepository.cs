using Dragon.Domain.Models;
using Dragon.DataAccess.Entities;
using Dragon.DataAccess.Mappers.Contracts;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dragon.Domain.Repository;
using Dragon.Serverless.Domain.Configuration;
using System.Linq;
using Dragon.Domain.Enums;

namespace Dragon.DataAccess.AzureTable.Repository.Implementations
{
    public class ShopRepository : AzureTableRepository<ShopEntity>, IShopRepository
    {
        private readonly IShopEntityMapper shopEntityMapper;

        protected override string TableName => "Shops";

        public ShopRepository(
            IShopEntityMapper shopEntityMapper,
            IAppConfiguration configuration,
            ILogger<AzureTableRepository<ShopEntity>> logger)
            : base(configuration, logger)
        {
            this.shopEntityMapper = shopEntityMapper ?? throw new ArgumentNullException(nameof(shopEntityMapper));
        }

        public async Task<IList<Shop>> GetAllAsync(bool? isActive)
        {
            var retrieved = await this.RetrieveEntityListByPartitionKeyAsync("shops");
            var result = retrieved
                .Where(x => !isActive.HasValue || x.IsActive == x.IsActive)
                .Select(x => this.shopEntityMapper.Convert(x)).ToList();

            return result;
        }

        public async Task<Shop> GetAsync(string id)
        {
            var retrieved = await this.RetrieveEntityAsync("shops", id);
            var result = this.shopEntityMapper.Convert(retrieved);

            return result;
        }

        public async Task<Shop> InsertAsync(Shop shop)
        {
            var retrieved = await this.RetrieveEntityAsync("shops", shop.Id);
            if (retrieved != null)
                return null;

            var entity = this.shopEntityMapper.Convert(shop);

            var created = await this.InsertOrMergeEntityAsync(entity);
            var result = this.shopEntityMapper.Convert(created);

            return result;
        }

        public async Task<Shop> UpdateAsync(Shop shop)
        {
            var retrieved = await this.RetrieveEntityAsync("shops", shop.Id);
            if (retrieved == null)
                return null;

            var entity = this.shopEntityMapper.Convert(shop);

            var updated = await this.InsertOrMergeEntityAsync(entity);
            var result = this.shopEntityMapper.Convert(updated);

            return result;
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var retrieved = await this.RetrieveEntityAsync("shops", id);
            if (retrieved == null)
                return false;

            await this.DeleteEntityAsync(retrieved);
            return true;
        }

        public async Task<OperationResult> ActivateAsync(string id, bool force)
        {
            var allShops = await this.RetrieveEntityListByPartitionKeyAsync("shops");
            var shop = allShops.FirstOrDefault(x => x.RowKey == id);
            if (shop == null)
                return OperationResult.NotFound;

            var alreadyActive = allShops.FirstOrDefault(x => x.IsActive);
            if (alreadyActive != null && alreadyActive != shop)
            {
                if (!force)
                    return OperationResult.Invalid;

                alreadyActive.IsActive = false;
                await this.InsertOrMergeEntityAsync(alreadyActive);
            }

            shop.IsActive = true;
            await this.InsertOrMergeEntityAsync(shop);
            return OperationResult.Done;
        }

        public async Task<bool> DeactivateAsync(string id)
        {
            var retrieved = await this.RetrieveEntityAsync("shops", id);
            if (retrieved == null)
                return false;

            retrieved.IsActive = false;
            await this.InsertOrMergeEntityAsync(retrieved);
            return true;
        } 
    }
}
