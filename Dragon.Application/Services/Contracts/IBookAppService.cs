using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using System.Collections.Generic;

namespace Dragon.Application.Services.Contracts
{
    public interface IBookAppService
    {
        IList<Book> GetAll();
        Book Get(int isbn);
        OperationResult Sell(int isbn);
        OperationResult UndoLastSell(int isbn);
    }
}
