using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System.Collections.Generic;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Shops
{
    [Order(8)]
    public class GetAllShops
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void GetAllShops_When_ThereAreShops_Returns200()
        {
            var request = ShopRequestHelper.GetAllShops();
            var response = this.restClient.Execute<List<ShopResponse>>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.True(response.Data.Count > 0);
        }
    }
}