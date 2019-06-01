using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Shops
{
    public class UpdateShop
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];
        private readonly string shopName = TestContext.Parameters["ShopName"];

        private const string EXISTING_SHOP = "ExistingShop";
        private const string UNEXISTING_SHOP = "UnexistingShop";

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void When_ShopUpdated_ReturnsOk()
        {
            var ticks = DateTime.UtcNow.Ticks;
            var updatedShop = new ShopRequest
            {
                Id = EXISTING_SHOP,
                Name = "Existing name",
                Description = ticks.ToString()
            };

            var request = ShopRequestHelper.UpdateShop(EXISTING_SHOP, updatedShop);
            var response = this.restClient.Execute<ShopResponse>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.AreEqual(updatedShop.Id, response.Data.Id);
            Assert.AreEqual(updatedShop.Name, response.Data.Name);
            Assert.AreEqual(updatedShop.Description, response.Data.Description);
        }

        [Test]
        public void When_ShopUpdatedWithDifferentId_ReturnsBadRequest()
        {
            var ticks = DateTime.UtcNow.Ticks;
            var updatedShop = new ShopRequest
            {
                Id = EXISTING_SHOP + "test",
                Name = "Existing name",
                Description = ticks.ToString()
            };

            var request = ShopRequestHelper.UpdateShop(EXISTING_SHOP, updatedShop);
            var response = this.restClient.Execute<ShopResponse>(request);

            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public void When_ShopDoesNotExist_ReturnsNotFound()
        {
            var ticks = DateTime.UtcNow.Ticks;
            var updatedShop = new ShopRequest
            {
                Id = UNEXISTING_SHOP,
                Name = "Existing name",
                Description = ticks.ToString()
            };

            var request = ShopRequestHelper.UpdateShop(UNEXISTING_SHOP, updatedShop);
            var response = this.restClient.Execute<ShopResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}