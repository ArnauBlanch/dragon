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
    [Order(3)]
    public class ActivateShop
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

        [Test, Order(2)]
        public void ActivateShopWithoutForcing_When_AlreadyActive_ReturnsNoContent()
        {
            var request = ShopRequestHelper.ActivateShop(EXISTING_SHOP, false);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test, Order(11)]
        public void ActivateShop_When_AllInactive_ReturnsNoContent()
        {
            this.DeactivateAllShops();
            var request = ShopRequestHelper.ActivateShop(EXISTING_SHOP, null);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test, Order(4)]
        public void ActivateShopWithoutForcing_When_AnotherActive_ReturnsConflict()
        {
            var id = this.GetTestShop();
            var request = ShopRequestHelper.ActivateShop(id, false);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.Conflict, response.StatusCode);
        }

        [Test, Order(4)]
        public void ActivateShopWithoutForceParameter_When_AnotherActive_ReturnsConflict()
        {
            var id = this.GetTestShop();
            var request = ShopRequestHelper.ActivateShop(id, null);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.Conflict, response.StatusCode);
        }

        [Test, Order(6)]
        public void ActivateShopForcing_When_AnotherActive_ReturnsNoContent()
        {
            var id = this.GetTestShop();
            var request = ShopRequestHelper.ActivateShop(id, true);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void ActivateShop_When_ShopDoesNotExist_ReturnsNotFound()
        {
            var request = ShopRequestHelper.ActivateShop(UNEXISTING_SHOP, null);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        private string GetTestShop()
        {
            var request = ShopRequestHelper.GetAllShops();
            var response = this.restClient.Execute<List<ShopResponse>>(request);
            var testShop = response.Data.First(x => x.Id.StartsWith("shop_"));
            return testShop.Id;
        }

        private void DeactivateAllShops()
        {
            var request = ShopRequestHelper.GetAllShops();
            request.AddQueryParameter("isActive", "true");
            var response = this.restClient.Execute<List<ShopResponse>>(request);
            response.Data.ForEach(activeShop =>
            {
                var deactivateRequest = ShopRequestHelper.DeactivateShop(activeShop.Id);
                this.restClient.Execute(deactivateRequest);
            });
        }
    }
}