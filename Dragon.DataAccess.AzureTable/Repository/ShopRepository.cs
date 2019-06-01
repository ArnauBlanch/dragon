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

        public async Task<IList<Shop>> GetAllAsync()
        {
            var retrieved = await this.RetrieveEntityListByPartitionKeyAsync("shops");
            var result = retrieved.Select(x => this.shopEntityMapper.Convert(x)).ToList();

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
    }
}
