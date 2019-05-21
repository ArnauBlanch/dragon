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
    public class GetAllSales
    {
        private readonly ISaleAppService saleAppService;

        public GetAllSales(ISaleAppService saleAppService)
        {
            this.saleAppService = saleAppService ?? throw new ArgumentNullException(nameof(saleAppService));
        }

        [FunctionName("GetAllSales")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log,
            ExecutionContext context)
        {
            if (string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var result = await this.saleAppService.GetAllAsync(req.Query["shop"]);

            return new OkObjectResult(result);
        }
    }
}
