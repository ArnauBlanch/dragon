using Dragon.Domain.Models;
using Dragon.Serverless.API.Mappers.Contracts;
using Dragon.Serverless.API.Models;
using OfficeOpenXml;
using System;
using System.Collections.Generic;

namespace Dragon.Serverless.API.Mappers.Implementations
{
    public class InventoryExcelMapper : IInventoryExcelMapper
    {
        public IEnumerable<Book> Convert(ExcelRange source)
        {
            if (source == null)
                return null;

            var i = source.Start.Row + 1;
            var hasContent = true;
            var result = new List<Book>();

            try
            {
                while (hasContent)
                {
                    hasContent = !string.IsNullOrEmpty(source[i, 1].Text);
                    if (!hasContent)
                        break;

                    var numCopies = int.Parse(source[i, (int)InventoryExcelColumns.Quantity].Text);
                    var book = new Book
                    {
                        ISBN = long.Parse(source[i, (int)InventoryExcelColumns.ISBN].Text),
                        Title = source[i, (int)InventoryExcelColumns.Title].Text,
                        Category = source.Worksheet.Name,
                        AvailableCopies = numCopies,
                        TotalCopies = numCopies,
                        Price = float.Parse(source[i, (int)InventoryExcelColumns.Price].Value.ToString()),
                        ReducedPrice = float.Parse(source[i, (int)InventoryExcelColumns.ReducedPrice].Value.ToString())
                    };
                    result.Add(book);
                    ++i;
                }
            }
            catch (Exception)
            {
                return null;
            }
            

            return result;
        }
    }
}
