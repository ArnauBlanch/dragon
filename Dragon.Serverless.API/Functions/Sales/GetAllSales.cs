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

namespace Dragon.Serverless.API.Functions.Sales
{
    public class GetAllSales
    {
        private readonly ISaleAppService saleAppService;
        private readonly ISaleMapper saleMapper;

        public GetAllSales(
            ISaleAppService saleAppService,
            ISaleMapper saleMapper)
        {
            this.saleAppService = saleAppService ?? throw new ArgumentNullException(nameof(saleAppService));
            this.saleMapper = saleMapper ?? throw new ArgumentNullException(nameof(saleMapper));
        }

        [FunctionName("GetAllSales")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log,
            ExecutionContext context)
        {
            if (string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var sales = await this.saleAppService.GetAllAsync(req.Query["shop"]);

            var result = sales.Select(x => this.saleMapper.Convert(x));

            return new OkObjectResult(result);
        }
    }
}
