using Dragon.Application.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System;
using System.Threading.Tasks;

namespace Dragon.Serverless.API.Functions.Books
{
    public class DeactivateShop
    {
        private readonly IShopAppService shopAppService;

        public DeactivateShop(IShopAppService shopAppService)
        {
            this.shopAppService = shopAppService ?? throw new ArgumentNullException(nameof(shopAppService));
        }

        [FunctionName("DeactivateShop")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req)
        {

            if (string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var result = await this.shopAppService.DeactivateAsync(req.Query["shop"]);
            if (result)
                return new NoContentResult();
            else
                return new NotFoundResult();
        }
    }
}
