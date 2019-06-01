using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Dragon.Application.Services.Contracts;
using Dragon.Serverless.API.Mappers.Contracts;
using System.Linq;

namespace Dragon.Serverless.API.Functions.Sales
{
    public class GetBookSales
    {
        private readonly ISaleAppService saleAppService;
        private readonly ISaleMapper saleMapper;

        public GetBookSales(
            ISaleAppService saleAppService,
            ISaleMapper saleMapper)
        {
            this.saleAppService = saleAppService ?? throw new ArgumentNullException(nameof(saleAppService));
            this.saleMapper = saleMapper ?? throw new ArgumentNullException(nameof(saleMapper));
        }

        [FunctionName("GetBookSales")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req)
        {
            if (!long.TryParse(req.Query["isbn"], out long isbn) || string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var sales = await this.saleAppService.GetByISBNAsync(req.Query["shop"], isbn);
            if (sales == null)
                return new NotFoundResult();

            var result = sales.Select(x => this.saleMapper.Convert(x));

            return new OkObjectResult(result);
        }
    }
}
