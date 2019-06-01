using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System.Collections.Generic;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Sales
{
    public class GetAllSales
    {
        private readonly string shopName = TestContext.Parameters["ShopName"];
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void GetAllSales_When_ThereAreSales_ReturnsOk()
        {
            var request = SaleRequestHelper.GetAllSales(shopName);
            var response = this.restClient.Execute<List<SaleResponse>>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.True(response.Data.Count > 0);
        }

        [Test]
        public void GetAllSales_When_ShopDoesNotExist_ReturnsNotFound()
        {
            var request = SaleRequestHelper.GetAllSales("UnexistingShop");
            var response = this.restClient.Execute<List<SaleResponse>>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public void GetAllSales_When_ThereAreNoSales_ReturnsOK()
        {
            var request = SaleRequestHelper.GetAllSales("EmptyShop");
            var response = this.restClient.Execute<List<SaleResponse>>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.True(response.Data.Count == 0);
        }
    }
}