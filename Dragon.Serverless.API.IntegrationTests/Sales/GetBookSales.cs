using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System.Collections.Generic;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Sales
{
    public class GetBookSales
    {
        private readonly string shopName = TestContext.Parameters["ShopName"];
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];

        private const int EXISTING_BOOK = 100;
        private const int EXISTING_BOOK2 = 101;
        private const int NON_EXISTING_BOOK = 99999;

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void When_BookHasSales_ReturnsOk()
        {
            var request = SaleRequestHelper.GetBookSales(shopName, EXISTING_BOOK);
            var response = this.restClient.Execute<List<SaleResponse>>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
        }

        [Test]
        public void When_BookSoldWithoutSeller_ReturnsNoContent()
        {
            var request = SaleRequestHelper.GetBookSales(shopName, EXISTING_BOOK2);
            var response = this.restClient.Execute<List<SaleResponse>>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
        }

        [Test]
        public void When_BookDoesNotExist_ReturnsNotFound()
        {
            var request = SaleRequestHelper.GetBookSales(shopName, NON_EXISTING_BOOK);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}