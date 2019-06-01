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
    public class GetAllSales
    {
        private readonly ISaleAppService saleAppService;
        private readonly IShopAppService shopAppService;
        private readonly ISaleMapper saleMapper;

        public GetAllSales(
            ISaleAppService saleAppService,
            IShopAppService shopAppService,
            ISaleMapper saleMapper)
        {
            this.saleAppService = saleAppService ?? throw new ArgumentNullException(nameof(saleAppService));
            this.shopAppService = shopAppService ?? throw new ArgumentNullException(nameof(shopAppService));
            this.saleMapper = saleMapper ?? throw new ArgumentNullException(nameof(saleMapper));
        }

        [FunctionName("GetAllSales")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var shop = await this.shopAppService.GetByIdAsync(req.Query["shop"]);
            if (shop == null)
                return new NotFoundResult();

            var sales = await this.saleAppService.GetAllAsync(req.Query["shop"]);

            var result = sales.Select(x => this.saleMapper.Convert(x));

            return new OkObjectResult(result);
        }
    }
}
