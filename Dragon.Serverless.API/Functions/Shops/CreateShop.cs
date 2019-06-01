using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Dragon.Application.Services.Contracts;
using System.IO;
using Newtonsoft.Json;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Mappers.Contracts;

namespace Dragon.Serverless.API.Functions.Books
{
    public class CreateShop
    {
        private readonly IShopAppService shopAppService;
        private readonly IShopMapper shopMapper;

        public CreateShop(
            IShopAppService shopAppService,
            IShopMapper shopMapper)
        {
            this.shopAppService = shopAppService ?? throw new ArgumentNullException(nameof(shopAppService));
            this.shopMapper = shopMapper ?? throw new ArgumentNullException(nameof(shopMapper));
        }

        [FunctionName("CreateShop")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<ShopRequest>(requestBody);
            var shop = this.shopMapper.Convert(data);

            if (shop == null)
                return new BadRequestResult();

            var created = await this.shopAppService.CreateAsync(shop);
            if (created == null)
                return new ConflictResult();

            var result = this.shopMapper.Convert(created);

            return new CreatedResult("", result);
        }
    }
}
