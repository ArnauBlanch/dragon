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
    public class UnsellBook
    {
        private readonly ISaleAppService saleAppService;

        public UnsellBook(ISaleAppService saleAppService)
        {
            this.saleAppService = saleAppService ?? throw new ArgumentNullException(nameof(saleAppService));
        }

        [FunctionName("UnsellBook")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "delete", Route = null)] HttpRequest req)
        {
            if (!long.TryParse(req.Query["isbn"], out long isbn)
                || string.IsNullOrWhiteSpace(req.Query["shop"])
                || !DateTime.TryParse(req.Query["date"], out DateTime date))
                return new BadRequestResult();

            var result = await this.saleAppService.DeleteAsync(req.Query["shop"], isbn, date.ToUniversalTime());

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
