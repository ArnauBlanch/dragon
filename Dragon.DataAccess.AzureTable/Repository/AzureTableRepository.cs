using Dragon.Serverless.Domain.Configuration;
using Microsoft.Azure.Cosmos.Table;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dragon.DataAccess.AzureTable.Repository.Implementations
{
    public abstract class AzureTableRepository<T> where T : TableEntity, new ()
    {
        private readonly IAppConfiguration configuration;
        private readonly ILogger<AzureTableRepository<T>> logger;
        private CloudStorageAccount storageAccount;
        private CloudTable table;

        protected abstract string TableName { get; }

        public AzureTableRepository(
            IAppConfiguration configuration,
            ILogger<AzureTableRepository<T>> logger)
        {
            this.configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            this.logger = logger ?? throw new ArgumentNullException(nameof(configuration));

            var tableName = $"{this.TableName}{configuration.EnvironmentSuffix}";
            this.CreateStorageAccount();
            this.CreateTableAsync(tableName).Wait();
        }

        protected async Task<List<T>> RetrieveEntityListByPartitionKeyAsync(string partitionKey)
        {
            try
            {
                TableQuery<T> query = new TableQuery<T>().Where(
                    TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, partitionKey));
                var tableResult = await this.table.ExecuteQuerySegmentedAsync<T>(query, null);
                var result = tableResult.Results as List<T>;

                return result;
            } catch (StorageException ex)
            {
                logger.LogError(ex.Message);
                throw;
            }
        }

        protected async Task<List<T>> RetrieveEntityWherePartitionKeyStartWithAsync(string partitionKeyStart)
        {
            try
            {
                TableQuery<T> query = new TableQuery<T>().Where(
                    GetStartsWithFilter("PartitionKey", partitionKeyStart));
                var tableResult = await this.table.ExecuteQuerySegmentedAsync<T>(query, null);
                var result = tableResult.Results as List<T>;

                return result;
            }
            catch (StorageException ex)
            {
                logger.LogError(ex.Message);
                throw;
            }
        }

        protected async Task<T> RetrieveEntityAsync(string partitionKey, string rowKey)
        {
            try
            {
                var retrieveOperation = TableOperation.Retrieve<T>(partitionKey, rowKey);
                var tableResult = await this.table.ExecuteAsync(retrieveOperation);
                var result = tableResult.Result as T;

                return result;
            }
            catch (StorageException ex)
            {
                logger.LogError(ex.Message);
                throw;
            }
        }

        protected async Task<T> InsertOrMergeEntityAsync(T entity)
        {
            if (entity == null)
                throw new ArgumentException(nameof(entity));

            try
            {
                var insertOrMergeOperation = TableOperation.InsertOrMerge(entity);

                var tableResult = await this.table.ExecuteAsync(insertOrMergeOperation);
                var result = tableResult.Result as T;

                return result;
            }
            catch (StorageException ex)
            {
                logger.LogError(ex.Message);
                throw;
            }
        }

        protected async Task DeleteEntityAsync(T entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            try
            {
                var deleteOperation = TableOperation.Delete(entity);
                var tableResult = await this.table.ExecuteAsync(deleteOperation);
            }
            catch (StorageException ex)
            {
                logger.LogError(ex.Message);
                throw;
            }
        }

        private void CreateStorageAccount()
        {
            try
            {
                this.storageAccount = CloudStorageAccount.Parse(configuration.AzureStorageConnectionString);
            }
            catch (FormatException)
            {
                Console.WriteLine("Invalid storage account information provided. Please confirm the AccountName and AccountKey are valid in the app.config file - then restart the application.");
                throw;
            }
            catch (ArgumentException)
            {
                Console.WriteLine("Invalid storage account information provided. Please confirm the AccountName and AccountKey are valid in the app.config file - then restart the sample.");
                Console.ReadLine();
                throw;
            }
        }

        public async Task CreateTableAsync(string tableName)
        {
            var tableClient = this.storageAccount.CreateCloudTableClient(new TableClientConfiguration());

            table = tableClient.GetTableReference(tableName);
            if (await table.CreateIfNotExistsAsync())
            {
                logger.LogInformation("Created Table named: {0}", tableName);
            }
            else
            {
                logger.LogInformation("Table {0} already exists", tableName);
            }

        }

        private string GetStartsWithFilter(string columnName, string startsWith)
        {
            var length = startsWith.Length - 1;
            var nextChar = startsWith[length] + 1;

            var startWithEnd = startsWith.Substring(0, length) + (char)nextChar;
            var filter = TableQuery.CombineFilters(
                TableQuery.GenerateFilterCondition(columnName, QueryComparisons.GreaterThanOrEqual, startsWith),
                TableOperators.And,
                TableQuery.GenerateFilterCondition(columnName, QueryComparisons.LessThan, startWithEnd));

            return filter;
        }
    }
}
