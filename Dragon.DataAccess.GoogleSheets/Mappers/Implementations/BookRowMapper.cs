using Dragon.Domain.Models;
using Dragon.DataAccess.GoogleSheets.Mappers.Contracts;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Dragon.DataAccess.GoogleSheets.Repository.Columns;

namespace Dragon.DataAccess.GoogleSheets.Mappers.Implementations
{
    public class BookRowMapper : IBookRowMapper
    {
        public Book Convert(IList<object> source)
        {
            if (source == null || source.Count() != BookColumns.NUM_COLUMNS)
                return null;
            var values = source.Select(x => x.ToString()).ToList();

            if (!int.TryParse(values[BookColumns.ISBN], out int isbn) ||
                !float.TryParse(values[BookColumns.Price], NumberStyles.Any, CultureInfo.InvariantCulture, out float price) ||
                !float.TryParse(values[BookColumns.ReducedPrice], NumberStyles.Any, CultureInfo.InvariantCulture, out float reducedPrice) ||
                !int.TryParse(values[BookColumns.TotalCopies], out int totalCopies) ||
                !int.TryParse(values[BookColumns.AvailableCopies], out int availableCopies))
                return null;

            var result = new Book
            {
                ISBN = isbn,
                Title = values[BookColumns.Title],
                Author = values[BookColumns.Author],
                CoverUrl = values[BookColumns.CoverUrl],
                Publisher = values[BookColumns.Publisher],
                Price = price,
                ReducedPrice = reducedPrice,
                TotalCopies = totalCopies,
                AvailableCopies = availableCopies
            };

            return result;
        }

        public IList<object> Convert(Book source)
        {
            if (source == null)
                return null;

            var result = new List<object>();

            for (int i = 0; i < BookColumns.NUM_COLUMNS; ++i) result.Add(null);

            result[BookColumns.ISBN] = source.ISBN;
            result[BookColumns.Title] = source.Title;
            result[BookColumns.Author] = source.Author;
            result[BookColumns.CoverUrl] = source.CoverUrl;
            result[BookColumns.Publisher] = source.Publisher;
            result[BookColumns.Price] = source.Price.ToString(CultureInfo.InvariantCulture);
            result[BookColumns.ReducedPrice] = source.ReducedPrice.ToString(CultureInfo.InvariantCulture);
            result[BookColumns.TotalCopies] = source.TotalCopies;
            result[BookColumns.AvailableCopies] = source.AvailableCopies;

            return result;
        }
    }
}
