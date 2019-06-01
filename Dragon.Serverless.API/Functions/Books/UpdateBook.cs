using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Dragon.Application.Services.Contracts;
using System.IO;
using Newtonsoft.Json;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Mappers.Contracts;

namespace Dragon.Serverless.API.Functions.Books
{
    public class UpdateBook
    {
        private readonly IBookAppService bookAppService;
        private readonly IBookMapper bookMapper;

        public UpdateBook(
            IBookAppService bookAppService,
            IBookMapper bookMapper)
        {
            this.bookAppService = bookAppService ?? throw new ArgumentNullException(nameof(bookAppService));
            this.bookMapper = bookMapper ?? throw new ArgumentNullException(nameof(bookMapper));
        }

        [FunctionName("UpdateBook")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "put", Route = null)] HttpRequest req)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<BookRequest>(requestBody);
            var book = this.bookMapper.Convert(data);

            if (string.IsNullOrWhiteSpace(req.Query["shop"])
                || !long.TryParse(req.Query["isbn"], out long isbn)
                || book == null
                || book.ISBN != isbn)
                return new BadRequestResult();

            var updated = await this.bookAppService.UpdateAsync(req.Query["shop"], book);
            if (updated == null)
                return new NotFoundResult();

            var result = this.bookMapper.Convert(updated);

            return new OkObjectResult(result);
        }
    }
}
