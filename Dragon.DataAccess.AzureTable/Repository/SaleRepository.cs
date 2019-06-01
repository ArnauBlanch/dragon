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
    public class SaleRepository : AzureTableRepository<SaleEntity>, ISaleRepository
    {
        private readonly ISaleEntityMapper saleEntityMapper;

        protected override string TableName => "BookSales";

        public SaleRepository(
            ISaleEntityMapper saleEntityMapper,
            IAppConfiguration configuration,
            ILogger<AzureTableRepository<SaleEntity>> logger)
            : base(configuration, logger)
        {
            this.saleEntityMapper = saleEntityMapper ?? throw new ArgumentNullException(nameof(saleEntityMapper));
        }

        public async Task<IList<Sale>> GetAllAsync(string shop)
        {
            var retrieved = await this.RetrieveEntityWherePartitionKeyStartWithAsync($"{shop}_");
            var result = retrieved.Select(x => this.saleEntityMapper.Convert(x)).ToList();

            return result;
        }

        public async Task<IList<Sale>> GetByISBNAsync(string shop, int isbn)
        {
            var partitionKey = $"{shop}_{isbn}";
            var retrieved = await this.RetrieveEntityListByPartitionKeyAsync(partitionKey);
            var result = retrieved.Select(x => this.saleEntityMapper.Convert(x)).ToList();

            return result;
        }

        public async Task<Sale> InsertAsync(string shop, Sale sale)
        {
            var saleToInsert = this.saleEntityMapper.Convert(sale, shop);
            var inserted = await this.InsertOrMergeEntityAsync(saleToInsert);
            var result = this.saleEntityMapper.Convert(inserted);

            return result;

        }

        public async Task<bool> DeleteAsync(string shop, int isbn, string date)
        {
            var partitionKey = $"{shop}_{isbn}";
            var retrieved = await this.RetrieveEntityAsync(partitionKey, date);
            if (retrieved == null)
                return false;

            await this.DeleteEntityAsync(retrieved);
            return true;
        }

        public async Task<bool> DeleteAsync(string shop, int isbn)
        {
            var partitionKey = $"{shop}_{isbn}";
            var entities = await this.RetrieveEntityListByPartitionKeyAsync(partitionKey);

            foreach (var entity in entities)
            {
                await this.DeleteEntityAsync(entity);
            }

            return true;
        }

        public async Task<bool> DeleteAsync(string shop)
        {
            var entities = await this.RetrieveEntityWherePartitionKeyStartWithAsync($"{shop}_");

            foreach (var entity in entities)
            {
                await this.DeleteEntityAsync(entity);
            }

            return true;
        }
    }
}
