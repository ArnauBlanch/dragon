using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Dragon.Application.Services.Contracts;

namespace Dragon.Serverless.API.Functions.Sales
{
    public class GetBookSales
    {
        private readonly ISaleAppService saleAppService;

        public GetBookSales(ISaleAppService saleAppService)
        {
            this.saleAppService = saleAppService ?? throw new ArgumentNullException(nameof(saleAppService));
        }

        [FunctionName("GetBookSales")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log,
            ExecutionContext context)
        {
            if (!int.TryParse(req.Query["isbn"], out int isbn) || string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var result = await this.saleAppService.GetByISBNAsync(req.Query["shop"], isbn);

            return new OkObjectResult(result);
        }
    }
}
