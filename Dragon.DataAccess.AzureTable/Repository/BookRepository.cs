﻿using Dragon.Domain.Enums;
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
    public class BookInventory : AzureTableRepository<BookEntity>, IBookRepository
    {
        private readonly IBookEntityMapper bookEntityMapper;

        protected override string TableName => "BookInventory";

        public BookInventory(
            IBookEntityMapper bookEntityMapper,
            IAppConfiguration configuration,
            ILogger<AzureTableRepository<BookEntity>> logger)
            : base(configuration, logger)
        {
            this.bookEntityMapper = bookEntityMapper ?? throw new ArgumentNullException(nameof(bookEntityMapper));
        }

        public async Task<List<Book>> GetAllAsync(string shop)
        {
            var retrieved = await this.RetrieveEntityListByPartitionKeyAsync(shop);
            var result = retrieved.Select(x => this.bookEntityMapper.Convert(x)).ToList();

            return result;
        }

        public async Task<Book> GetByISBNAsync(string shop, long isbn)
        {
            var retrieved = await this.RetrieveEntityAsync(shop, isbn.ToString());
            var result = this.bookEntityMapper.Convert(retrieved);

            return result;
        }

        public async Task<OperationResult> SellByISBNAsync(string shop, long isbn)
        {
            var retrieved = await this.RetrieveEntityAsync(shop, isbn.ToString());
            if (retrieved == null)
                return OperationResult.NotFound;

            if (retrieved.AvailableCopies > 0)
            {
                retrieved.AvailableCopies--;
                await this.InsertOrMergeEntityAsync(retrieved);

                return OperationResult.Done;
            }
            else
            {
                return OperationResult.Invalid;
            }

        }

        public async Task<OperationResult> UnsellByISBNAsync(string shop, long isbn)
        {
            var retrieved = await this.RetrieveEntityAsync(shop, isbn.ToString());
            if (retrieved == null)
                return OperationResult.NotFound;

            if (retrieved.AvailableCopies < retrieved.TotalCopies)
            {
                retrieved.AvailableCopies++;
                await this.InsertOrMergeEntityAsync(retrieved);

                return OperationResult.Done;
            }
            else
            {
                return OperationResult.Invalid;
            }
        }

        public async Task<Book> InsertAsync(string shop, Book book)
        {
            var retrieved = await this.RetrieveEntityAsync(shop, book.ISBN.ToString());
            if (retrieved != null)
                return null;

            var entity = this.bookEntityMapper.Convert(book, shop);

            var created = await this.InsertOrMergeEntityAsync(entity);
            var result = this.bookEntityMapper.Convert(created);

            return result;
        }

        public async Task<Book> UpdateAsync(string shop, Book book)
        {
            var retrieved = await this.RetrieveEntityAsync(shop, book.ISBN.ToString());
            if (retrieved == null)
                return null;

            var entity = this.bookEntityMapper.Convert(book, shop);

            var updated = await this.InsertOrMergeEntityAsync(entity);
            var result = this.bookEntityMapper.Convert(updated);

            return result;
        }

        public async Task<bool> DeleteAsync(string shop, long isbn)
        {
            var retrieved = await this.RetrieveEntityAsync(shop, isbn.ToString());
            if (retrieved == null)
                return false;

            await this.DeleteEntityAsync(retrieved);
            return true;
        }

        public async Task<bool> DeleteAsync(string shop)
        {
            var entities = await this.RetrieveEntityListByPartitionKeyAsync(shop);

            foreach (var entity in entities)
            {
                await this.DeleteEntityAsync(entity);
            }

            return true;
        }
    }
}
