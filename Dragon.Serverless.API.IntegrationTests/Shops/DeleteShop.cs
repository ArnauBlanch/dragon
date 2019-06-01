using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System;
using System.Net;
using System.Linq;
using System.Collections.Generic;

namespace Dragon.Serverless.API.IntegrationTests.Shops
{
    public class DeleteShop
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];

        private const string UNEXISTING_SHOP = "UnexistingShop";

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test, Order(2)]
        public void When_ShopDeleted_ReturnsNoContent()
        {
            var id = this.GetTestShop();

            var request = ShopRequestHelper.DeleteShop(id);
            var response = this.restClient.Execute<ShopResponse>(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void When_BookDoesNotExist_ReturnsNotFound()
        {
            var request = ShopRequestHelper.DeleteShop(UNEXISTING_SHOP);
            var response = this.restClient.Execute<ShopResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        private string GetTestShop()
        {
            var id = new Random().Next();

            var request = ShopRequestHelper.GetAllShops();
            var response = this.restClient.Execute<List<ShopResponse>>(request);
            var testShop = response.Data.First(x => x.Id.StartsWith("shop_"));
            return testShop.Id;
        }
    }
}