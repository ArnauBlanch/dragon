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
    [Order(4)]
    public class DeactivateShop
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

        [Test, Order(7)]
        public void DeactivateShop_When_AlreadyInactive_ReturnsNoContent()
        {
            var request = ShopRequestHelper.DeactivateShop(EXISTING_SHOP);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test, Order(10)]
        public void DeactivateShop_When_Active_ReturnsNoContent()
        {
            var request = ShopRequestHelper.DeactivateShop(EXISTING_SHOP);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void DeactivateShop_When_ShopDoesNotExist_ReturnsNotFound()
        {
            var request = ShopRequestHelper.DeactivateShop(UNEXISTING_SHOP);
            var response = this.restClient.Execute(request);

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

        [TearDown]
        public void TearDown()
        {
            var activateRequest = ShopRequestHelper.ActivateShop(EXISTING_SHOP, force: true);
            this.restClient.Execute(activateRequest);
        }
    }
}