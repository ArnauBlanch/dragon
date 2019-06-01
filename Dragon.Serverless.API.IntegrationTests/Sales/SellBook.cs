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

        private const long EXISTING_BOOK = 100;
        private const long EXISTING_BOOK2 = 101;
        private const long NON_EXISTING_BOOK = 99999;
        private const long SOLD_OUT_BOOK = 150;

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void SellBook_When_BookSoldWithSeller_ReturnsNoContent()
        {
            var request = SaleRequestHelper.SellBook(shopName, EXISTING_BOOK, "TestSeller");

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void SellBook_When_ShopDoesNotExist_ReturnsNotFound()
        {
            var request = SaleRequestHelper.SellBook("UnexistingShop", EXISTING_BOOK, "TestSeller");

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public void SellBook_When_BookSoldWithoutSeller_ReturnsNoContent()
        {
            var request = SaleRequestHelper.SellBook(shopName, EXISTING_BOOK2, null);

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void SellBook_When_BookDoesNotExist_ReturnsNotFound()
        {
            var request = SaleRequestHelper.SellBook(shopName, NON_EXISTING_BOOK, null);

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public void SellBook_When_BookIsSoldOut_ReturnsBadRequest()
        {
            var request = SaleRequestHelper.SellBook(shopName, SOLD_OUT_BOOK, null);

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}