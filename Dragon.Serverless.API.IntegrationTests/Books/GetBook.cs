using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Books
{
    public class GetBook
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];
        private readonly string shopName = TestContext.Parameters["ShopName"];

        private const int EXISTING_BOOK = 100;
        private const int UNEXISTING_BOOK = 99999;

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void GetBook_When_BookExists_Returns200()
        {
            var request = BookRequestHelper.GetBook(shopName, EXISTING_BOOK);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.AreEqual(EXISTING_BOOK, response.Data.ISBN);
        }

        [Test]
        public void GetBook_When_ShopDoesNotExist_ReturnsNotFound()
        {
            var request = BookRequestHelper.GetBook("UnexistingShop", EXISTING_BOOK);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public void GetBook__When_BookDoesntExist_Returns404()
        {
            var request = BookRequestHelper.GetBook(shopName, UNEXISTING_BOOK);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}