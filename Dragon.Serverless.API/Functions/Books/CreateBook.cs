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
    public class CreateBook
    {
        private readonly IBookAppService bookAppService;
        private readonly IBookMapper bookMapper;

        public CreateBook(
            IBookAppService bookAppService,
            IBookMapper bookMapper)
        {
            this.bookAppService = bookAppService ?? throw new ArgumentNullException(nameof(bookAppService));
            this.bookMapper = bookMapper ?? throw new ArgumentNullException(nameof(bookMapper));
        }

        [FunctionName("CreateBook")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<BookRequest>(requestBody);
            var book = this.bookMapper.Convert(data);

            if (string.IsNullOrWhiteSpace(req.Query["shop"]) || book == null)
                return new BadRequestResult();

            var created = await this.bookAppService.CreateAsync(req.Query["shop"], book);
            if (created == null)
                return new ConflictResult();

            var result = this.bookMapper.Convert(created);

            return new CreatedResult("", result);
        }
    }
}
