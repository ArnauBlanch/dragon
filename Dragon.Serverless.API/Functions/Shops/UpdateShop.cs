using Dragon.Application.Services.Contracts;
using Dragon.Serverless.API.Mappers.Contracts;
using Dragon.Serverless.API.Models.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Dragon.Serverless.API.Functions.Books
{
    public class UpdateShop
    {
        private readonly IShopAppService shopAppService;
        private readonly IShopMapper shopMapper;

        public UpdateShop(
            IShopAppService shopAppService,
            IShopMapper shopMapper)
        {
            this.shopAppService = shopAppService ?? throw new ArgumentNullException(nameof(shopAppService));
            this.shopMapper = shopMapper ?? throw new ArgumentNullException(nameof(shopMapper));
        }

        [FunctionName("UpdateShop")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "put", Route = null)] HttpRequest req)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<ShopRequest>(requestBody);
            var shop = this.shopMapper.Convert(data);

            if (string.IsNullOrWhiteSpace(req.Query["shop"])
                || shop == null
                || shop.Id != req.Query["shop"])
                return new BadRequestResult();

            var updated = await this.shopAppService.UpdateAsync(shop);
            if (updated == null)
                return new NotFoundResult();

            var result = this.shopMapper.Convert(updated);

            return new OkObjectResult(result);
        }
    }
}
