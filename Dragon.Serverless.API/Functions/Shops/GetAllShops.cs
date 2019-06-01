using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Dragon.Application.Services.Contracts;
using Dragon.Serverless.API.Mappers.Contracts;
using System.Linq;

namespace Dragon.Serverless.API.Functions.Shops
{
    public class GetAllShops
    {
        private readonly IShopAppService shopAppService;
        private readonly IShopMapper shopMapper;

        public GetAllShops(
            IShopAppService shopAppService,
            IShopMapper shopMapper)
        {
            this.shopAppService = shopAppService ?? throw new ArgumentNullException(nameof(shopAppService));
            this.shopMapper = shopMapper ?? throw new ArgumentNullException(nameof(shopMapper));
        }

        [FunctionName("GetAllShops")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req)
        {
            var shops = await this.shopAppService.GetAllAsync();

            var result = shops.Select(x => this.shopMapper.Convert(x));

            return new OkObjectResult(result);
        }
    }
}
