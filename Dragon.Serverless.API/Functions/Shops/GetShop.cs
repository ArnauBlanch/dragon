using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Dragon.Application.Services.Contracts;
using Dragon.Serverless.API.Mappers.Contracts;

namespace Dragon.Serverless.API.Functions.Shops
{
    public class GetShop
    {
        private readonly IShopAppService shopAppService;
        private readonly IShopMapper shopMapper;

        public GetShop(
            IShopAppService shopAppService,
            IShopMapper shopMapper)
        {
            this.shopAppService = shopAppService ?? throw new ArgumentNullException(nameof(shopAppService));
            this.shopMapper = shopMapper ?? throw new ArgumentNullException(nameof(shopMapper));
        }

        [FunctionName("GetShop")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var shop = await this.shopAppService.GetByIdAsync(req.Query["shop"]);
            if (shop == null)
                return new NotFoundResult();

            var result = this.shopMapper.Convert(shop);

            return new OkObjectResult(result);
        }
    }
}
