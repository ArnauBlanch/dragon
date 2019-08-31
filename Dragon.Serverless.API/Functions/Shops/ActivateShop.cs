using Dragon.Application.Services.Contracts;
using Dragon.Domain.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using System;
using System.Threading.Tasks;

namespace Dragon.Serverless.API.Functions.Books
{
    public class ActivateShop
    {
        private readonly IShopAppService shopAppService;

        public ActivateShop(IShopAppService shopAppService)
        {
            this.shopAppService = shopAppService ?? throw new ArgumentNullException(nameof(shopAppService));
        }

        [FunctionName("ActivateShop")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req)
        {
            bool force = false;
            if (string.IsNullOrWhiteSpace(req.Query["shop"]) || (req.Query.ContainsKey("force") && !bool.TryParse(req.Query["force"], out force)))
                return new BadRequestResult();

            var result = await this.shopAppService.ActivateAsync(req.Query["shop"], force);
            if (result == OperationResult.Done)
                return new NoContentResult();
            else if (result == OperationResult.Invalid)
                return new ConflictResult();
            else
                return new NotFoundResult();
        }
    }
}
