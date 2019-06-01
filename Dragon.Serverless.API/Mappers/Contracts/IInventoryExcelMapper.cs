using Dragon.Domain.Models;
using OfficeOpenXml;
using System.Collections.Generic;

namespace Dragon.Serverless.API.Mappers.Contracts
{
    public interface IInventoryExcelMapper
    {
        IEnumerable<Book> Convert(ExcelRange source);
    }
}
