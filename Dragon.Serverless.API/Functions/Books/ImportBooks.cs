using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Dragon.Application.Services.Contracts;
using Dragon.Serverless.API.Mappers.Contracts;
using OfficeOpenXml;
using System.Linq;
using Dragon.Serverless.API.Models.Response;
using System.Collections.Generic;

namespace Dragon.Serverless.API.Functions.Books
{
    public class ImportBooks
    {
        private readonly IBookAppService bookAppService;
        private readonly IShopAppService shopAppService;
        private readonly IInventoryExcelMapper inventoryExcelMapper;

        public ImportBooks(
            IBookAppService bookAppService,
            IShopAppService shopAppService,
            IInventoryExcelMapper inventoryExcelMapper)
        {
            this.bookAppService = bookAppService ?? throw new ArgumentNullException(nameof(bookAppService));
            this.shopAppService = shopAppService ?? throw new ArgumentNullException(nameof(shopAppService));
            this.inventoryExcelMapper = inventoryExcelMapper ?? throw new ArgumentNullException(nameof(inventoryExcelMapper));
        }

        [FunctionName("ImportBooks")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var shop = await this.shopAppService.GetByIdAsync(req.Query["shop"]);
            if (shop == null)
                return new NotFoundResult();

            var stream = req.Body;
            var result = new ImportBooksResponse
            {
                TotalBooks = 0,
                BooksInserted = 0,
                Categories = new List<ImportedCategoryResponse>()
            };

            using (var package = new ExcelPackage(stream))
            {
                foreach (var sheet in package.Workbook.Worksheets)
                {
                    var books = inventoryExcelMapper.Convert(sheet.Cells);
                    var category = new ImportedCategoryResponse
                    {
                        Name = sheet.Name,
                        BooksInserted = 0,
                        TotalBooks = books.Count()
                    };

                    await Task.WhenAll(books.Select(async x =>
                     {
                         var inserted = await this.bookAppService.CreateAsync(shop.Id, x);
                         if (inserted != null)
                             ++category.BooksInserted;
                     }));

                    result.TotalBooks += category.TotalBooks;
                    result.BooksInserted += category.BooksInserted;
                    result.Categories.Add(category);
                }
            }

            return new CreatedResult("", result);
        }
    }
}
