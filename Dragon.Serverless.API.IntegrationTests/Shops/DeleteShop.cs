using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System;
using System.Net;

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

        [Test]
        public void When_ShopDeleted_ReturnsNoContent()
        {
            var id = this.InsertShop();

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

        private string InsertShop()
        {
            var id = new Random().Next();
            var newShop = new ShopRequest
            {
                Id = $"shop{id}",
                Name = "Name",
                Description = "Description"
            };

            var request = ShopRequestHelper.CreateShop(newShop);
            var response = this.restClient.Execute<ShopResponse>(request);
            return response.Data.Id;
        }
    }
}