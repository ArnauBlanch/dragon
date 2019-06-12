using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;

namespace Dragon.Serverless.API.Functions.Books
{
    public class CheckApiKey
    {
        [FunctionName("CheckApiKey")]
        public IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req)
        {
            return new OkResult();
        }
    }
}
