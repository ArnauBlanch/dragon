using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Dragon.Application.Services.Contracts;
using Dragon.Domain.Enums;

namespace Dragon.Serverless.API.Functions.Sales
{
    public class SellBook
    {
        private readonly ISaleAppService saleAppService;

        public SellBook(ISaleAppService saleAppService)
        {
            this.saleAppService = saleAppService ?? throw new ArgumentNullException(nameof(saleAppService));
        }

        [FunctionName("SellBook")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req)
        {
            if (!int.TryParse(req.Query["isbn"], out int isbn) || string.IsNullOrWhiteSpace(req.Query["shop"]))
                return new BadRequestResult();

            var result = await this.saleAppService.CreateAsync(req.Query["shop"], isbn, req.Query["seller"]);

            switch (result)
            {
                case OperationResult.Done:
                    return new NoContentResult();
                case OperationResult.Invalid:
                    return new BadRequestResult();
                default:
                    return new NotFoundResult();
            }
        }
    }
}
