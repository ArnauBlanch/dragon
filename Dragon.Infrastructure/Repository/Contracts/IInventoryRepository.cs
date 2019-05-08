using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using System.Collections.Generic;

namespace Dragon.Infrastructure.Repository.Contracts
{
    public interface IInventoryRepository
    {
        Book GetByISBN(int isbn);
        List<Book> GetAll();
        OperationResult SellByISBN(int isbn);
        OperationResult UndoLastSellByISBN(int isbn);
    }
}
