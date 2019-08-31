using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Shops
{
    [Order(8)]
    public class GetShop
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];
        private const string EXISTING_SHOP = "ExistingShop";
        private const string UNEXISTING_SHOP = "UnexistingShop";


        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void GetShop_When_ShopExists_Returns200()
        {
            var request = ShopRequestHelper.GetShop(EXISTING_SHOP);
            var response = this.restClient.Execute<ShopResponse>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.AreEqual(EXISTING_SHOP, response.Data.Id);
        }

        [Test]
        public void GetShop_When_BookDoesntExist_Returns404()
        {
            var request = ShopRequestHelper.GetShop(UNEXISTING_SHOP);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}