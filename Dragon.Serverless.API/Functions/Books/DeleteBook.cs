using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Dragon.Application.Services.Contracts;

namespace Dragon.Serverless.API.Functions.Books
{
    public class DeleteBook
    {
        private readonly IBookAppService bookAppService;

        public DeleteBook(IBookAppService bookAppService)
        {
            this.bookAppService = bookAppService ?? throw new ArgumentNullException(nameof(bookAppService));
        }

        [FunctionName("DeleteBook")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "delete", Route = null)] HttpRequest req,
            ILogger log)
        {
            if (!long.TryParse(req.Query["isbn"], out long isbn) || string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var result = await this.bookAppService.DeleteAsync(req.Query["shop"], isbn);

            if (!result)
                return new NotFoundResult();

            return new NoContentResult();
        }
    }
}
