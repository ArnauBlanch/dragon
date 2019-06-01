using System;
using System.Collections.Generic;
using System.Text;

namespace Dragon.Serverless.API.Models.Response
{
    public class ImportedCategoryResponse
    {
        public string Name { get; set; }
        public int BooksInserted { get; set; }
        public int TotalBooks { get; set; }
    }
}
