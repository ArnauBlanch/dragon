using Dragon.DataAccess.GoogleSheets.Mappers.Contracts;
using Dragon.DataAccess.GoogleSheets.Services.Contracts;
using Dragon.Domain.Enums;
using Dragon.Domain.Models;
using Dragon.Domain.Repository;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dragon.DataAccess.GoogleSheets.Repository
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

        public async Task<Book> GetByISBNAsync(int isbn)
        {
            var values = await this.GetAllValuesAsync();
            var matchingItem = this.GetMatchingItem(values, isbn);

            var result = this.bookRowMapper.Convert(matchingItem);
            return result;
        }

        public async Task<List<Book>> GetAllAsync()
        {
            var values = await this.GetAllValuesAsync();

            var result = values.Select(x => bookRowMapper.Convert(x)).ToList();
            return result;
        }

        public async Task<OperationResult> SellByISBNAsync(int isbn)
        {
            var result = await this.UpdateAvailableCopiesAsync(
                isbn,
                book => book.AvailableCopies > 0,
                book => book.AvailableCopies - 1);
            return result;
        }

        public async Task<OperationResult> UndoLastSellByISBNAsync(int isbn)
        {
            var result = await this.UpdateAvailableCopiesAsync(
                isbn,
                book => book.AvailableCopies < book.TotalCopies,
                book => book.AvailableCopies + 1);
            return result;
        }

        private async Task<OperationResult> UpdateAvailableCopiesAsync(int isbn, Func<Book, bool> precondition, Func<Book, int> updateAvailableCopies)
        {
            var result = OperationResult.NotFound;
            var values = await this.GetAllValuesAsync();
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
                    var updateResponse = await updateRequest.ExecuteAsync();
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

        private async Task<IList<IList<object>>> GetAllValuesAsync()
        {
            var request = this.sheetsService.GetValuesResource().Get(SheetId, SheetName);

            var response = await request.ExecuteAsync();
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
