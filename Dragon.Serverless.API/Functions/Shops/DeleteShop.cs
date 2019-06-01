using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Dragon.Application.Services.Contracts;

namespace Dragon.Serverless.API.Functions.Shops
{
    public class DeleteShop
    {
        private readonly IShopAppService shopAppService;

        public DeleteShop(IShopAppService shopAppService)
        {
            this.shopAppService = shopAppService ?? throw new ArgumentNullException(nameof(shopAppService));
        }

        [FunctionName("DeleteShop")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "delete", Route = null)] HttpRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var result = await this.shopAppService.DeleteAsync(req.Query["shop"]);

            if (!result)
                return new NotFoundResult();

            return new NoContentResult();
        }
    }
}
