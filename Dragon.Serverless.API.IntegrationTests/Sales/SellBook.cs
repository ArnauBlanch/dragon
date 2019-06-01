using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Sales
{
    public class SellBook
    {
        private readonly string shopName = TestContext.Parameters["ShopName"];
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];

        private const int EXISTING_BOOK = 100;
        private const int EXISTING_BOOK2 = 101;
        private const int NON_EXISTING_BOOK = 99999;
        private const int SOLD_OUT_BOOK = 150;

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void When_BookSoldWithSeller_ReturnsNoContent()
        {
            var request = SaleRequestHelper.SellBook(shopName, EXISTING_BOOK, "TestSeller");

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void When_BookSoldWithoutSeller_ReturnsNoContent()
        {
            var request = SaleRequestHelper.SellBook(shopName, EXISTING_BOOK2, null);

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void When_BookDoesNotExist_ReturnsNotFound()
        {
            var request = SaleRequestHelper.SellBook(shopName, NON_EXISTING_BOOK, null);

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public void When_BookIsSoldOut_ReturnsBadRequest()
        {
            var request = SaleRequestHelper.SellBook(shopName, SOLD_OUT_BOOK, null);

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}