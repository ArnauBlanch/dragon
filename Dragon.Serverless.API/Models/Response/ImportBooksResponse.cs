using System.Collections.Generic;

namespace Dragon.Serverless.API.Models.Response
{
    public class ImportBooksResponse
    {
        public int TotalBooks { get; set; }
        public int BooksInserted { get; set; }

        public List<ImportedCategoryResponse> Categories { get; set; }
    }
}
