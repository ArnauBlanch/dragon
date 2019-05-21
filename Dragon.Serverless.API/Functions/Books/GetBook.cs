using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Dragon.Application.Services.Contracts;
using Dragon.Serverless.API.Mappers.Contracts;

namespace Dragon.Serverless.API.Functions.Books
{
    public class GetBook
    {
        private readonly IBookAppService bookAppService;
        private readonly IBookMapper bookMapper;

        public GetBook(
            IBookAppService bookAppService,
            IBookMapper bookMapper)
        {
            this.bookAppService = bookAppService ?? throw new ArgumentNullException(nameof(bookAppService));
            this.bookMapper = bookMapper ?? throw new ArgumentNullException(nameof(bookMapper));
        }

        [FunctionName("GetBookByISBN")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log,
            ExecutionContext context)
        {
            if (!int.TryParse(req.Query["isbn"], out int isbn) || string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var book = await this.bookAppService.GetAsync(req.Query["shop"], isbn);
            if (book == null)
                return new NotFoundResult();

            var result = this.bookMapper.Convert(book);
            return new OkObjectResult(result);
        }
    }
}
