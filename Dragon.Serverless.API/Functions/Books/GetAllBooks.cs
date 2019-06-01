using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Dragon.Application.Services.Contracts;
using Dragon.Serverless.API.Mappers.Contracts;
using System.Linq;

namespace Dragon.Serverless.API.Functions.Books
{
    public class GetAllBooks
    {
        private readonly IBookAppService bookAppService;
        private readonly IShopAppService shopAppService;
        private readonly IBookMapper bookMapper;

        public GetAllBooks(
            IBookAppService bookAppService,
            IShopAppService shopAppService,
            IBookMapper bookMapper)
        {
            this.bookAppService = bookAppService ?? throw new ArgumentNullException(nameof(bookAppService));
            this.shopAppService = shopAppService ?? throw new ArgumentNullException(nameof(shopAppService));
            this.bookMapper = bookMapper ?? throw new ArgumentNullException(nameof(bookMapper));
        }

        [FunctionName("GetAllBooks")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log,
            ExecutionContext context)
        {
            if (string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var shop = await this.shopAppService.GetByIdAsync(req.Query["shop"]);
            if (shop == null)
                return new NotFoundResult();

            var books = await this.bookAppService.GetAllAsync(req.Query["shop"]);

            var result = books.Select(x => this.bookMapper.Convert(x));

            return new OkObjectResult(result);
        }
    }
}
