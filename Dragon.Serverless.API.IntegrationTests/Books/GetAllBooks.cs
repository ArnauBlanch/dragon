using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System.Collections.Generic;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Books
{
    public class GetAllBooks
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];
        private readonly string shopName = TestContext.Parameters["ShopName"];

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void GetAllBooks_When_ThereAreBooks_Returns200()
        {
            var request = BookRequestHelper.GetAllBooks(shopName);
            var response = this.restClient.Execute<List<BookResponse>>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.True(response.Data.Count > 0);
        }

        [Test]
        public void GetAllBooks_When_ShopDoesNotExist_ReturnsNotFound()
        {
            var request = BookRequestHelper.GetAllBooks("UnexistingShop");
            var response = this.restClient.Execute<List<BookResponse>>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public void GetAllBooks_When_ThereAreNoBooks_ReturnsEmptyOk()
        {
            var request = BookRequestHelper.GetAllBooks("EmptyShop");
            var response = this.restClient.Execute<List<BookResponse>>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.True(response.Data.Count == 0);
        }
    }
}