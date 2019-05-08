using Dragon.Application.Services.Contracts;
using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using Dragon.Infrastructure.Repository.Contracts;
using System;
using System.Collections.Generic;

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

        public Book Get(int isbn)
        {
            var result = this.inventoryRepository.GetByISBN(isbn);
            return result;
        }

        public IList<Book> GetAll()
        {
            var result = this.inventoryRepository.GetAll();
            return result;
        }

        public OperationResult Sell(int isbn)
        {
            var result = this.inventoryRepository.SellByISBN(isbn);

            if (result == OperationResult.Done)
            {
                var sale = new Sale
                {
                    ISBN = isbn,
                    Date = DateTime.UtcNow,
                    Seller = "Arnau"
                };

                var inserted = this.salesRepository.Insert(sale);
                if (!inserted)
                    throw new Exception("Sale could not be inserted");
            }

            return result;
        }

        public OperationResult UndoLastSell(int isbn)
        {
            var result = this.inventoryRepository.UndoLastSellByISBN(isbn);

            if (result == OperationResult.Done)
            {
                var deleted = this.salesRepository.DeleteLastByISBN(isbn);
                if (!deleted)
                    throw new Exception("Sale could not be deleted");
            }

            return result;
        }
    }
}
