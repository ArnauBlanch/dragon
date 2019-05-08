using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using Dragon.Infrastructure.Mappers.Contracts;
using Dragon.Infrastructure.Repository.Contracts;
using Dragon.Infrastructure.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Dragon.Infrastructure.Repository.Implementations
{
    public class InventoryRepository : IInventoryRepository
    {
        const string SheetId = "1V55gn_bv9C4ZQl6DVAU5nn8JPXWG7kBrhwFlkONCiWE";
        const string SheetName = "Inventory";

        private readonly IGoogleSheetsService sheetsService;
        private readonly IBookRowMapper bookRowMapper;

        public InventoryRepository(
            IGoogleSheetsService sheetsService,
            IBookRowMapper bookRowMapper)
        {
            this.sheetsService = sheetsService;
            this.bookRowMapper = bookRowMapper;
        }

        public Book GetByISBN(int isbn)
        {
            var values = this.GetAllValues();
            var matchingItem = this.GetMatchingItem(values, isbn);

            var result = this.bookRowMapper.Convert(matchingItem);
            return result;
        }

        public List<Book> GetAll()
        {
            var values = this.GetAllValues();

            var result = values.Select(x => bookRowMapper.Convert(x)).ToList();
            return result;
        }

        public OperationResult SellByISBN(int isbn)
        {
            var result = this.UpdateAvailableCopies(
                isbn,
                book => book.AvailableCopies > 0,
                book => book.AvailableCopies - 1);
            return result;
        }

        public OperationResult UndoLastSellByISBN(int isbn)
        {
            var result = this.UpdateAvailableCopies(
                isbn,
                book => book.AvailableCopies < book.TotalCopies,
                book => book.AvailableCopies + 1);
            return result;
        }

        private OperationResult UpdateAvailableCopies(int isbn, Func<Book, bool> precondition, Func<Book, int> updateAvailableCopies)
        {
            var result = OperationResult.NotFound;
            var values = this.GetAllValues();
            var matchingItem = this.GetMatchingItem(values, isbn);

            if (matchingItem != null)
            {
                var book = this.bookRowMapper.Convert(matchingItem);
                result = OperationResult.Invalid;

                if (precondition(book))
                {
                    book.AvailableCopies = updateAvailableCopies(book);

                    var itemIndex = values.IndexOf(matchingItem);
                    var range = $"{SheetName}!{GetColumnLetter(BookColumns.AvailableCopies)}{itemIndex + 2}";

                    var updatedValueRange = new ValueRange { Values = new List<IList<object>> { new List<object> { book.AvailableCopies } } };

                    var updateRequest = this.sheetsService.GetValuesResource().Update(updatedValueRange, SheetId, range);
                    updateRequest.ValueInputOption = SpreadsheetsResource.ValuesResource.UpdateRequest.ValueInputOptionEnum.USERENTERED;
                    var updateResponse = updateRequest.Execute();
                    if (updateResponse.UpdatedCells == 1)
                        result = OperationResult.Done;
                }
            }

            return result;
        }

        private char GetColumnLetter(int position)
        {
            var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return alphabet[position];
        }

        private IList<IList<object>> GetAllValues()
        {
            var request = this.sheetsService.GetValuesResource().Get(SheetId, SheetName);

            var response = request.Execute();
            var values = response.Values.Skip(1).ToList();
            return values;
        }

        private IList<object> GetMatchingItem(IList<IList<object>> values, int isbn)
        {
            var result = values.FirstOrDefault(x =>
                x.Count > 0
                && int.TryParse(x[BookColumns.ISBN].ToString(), out int itemIsbn)
                && itemIsbn == isbn);

            return result;
        }
    }
}
