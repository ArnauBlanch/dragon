using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Shops
{
    public class CreateShop
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];

        private const string EXISTING_SHOP = "ExistingShop";

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test, Order(1)]
        public void When_NewShopCreated_ReturnsCreated()
        {
            var id = new Random().Next();
            var newShop = new ShopRequest
            {
                Id = $"shop_{id}",
                Name = "Shop name",
                Description = "Shop description"
            };

            var request = ShopRequestHelper.CreateShop(newShop);
            var response = this.restClient.Execute<ShopResponse>(request);

            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.AreEqual(newShop.Id, response.Data.Id);
            Assert.AreEqual(newShop.Name, response.Data.Name);
        }

        [Test]
        public void When_ShopAlreadyExists_ReturnsConflict()
        {
            var newShop = new ShopRequest
            {
                Id = EXISTING_SHOP,
                Name = "Shop name",
                Description = "Shop description"
            };

            var request = ShopRequestHelper.CreateShop(newShop);
            var response = this.restClient.Execute<ShopResponse>(request);

            Assert.AreEqual(HttpStatusCode.Conflict, response.StatusCode);
        }

        [Test]
        public void When_NoShopSent_ReturnsBadRequest()
        {
            var request = ShopRequestHelper.CreateShop(null);
            var response = this.restClient.Execute<ShopResponse>(request);

            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}