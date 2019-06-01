using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Books
{
    public class ImportBooks
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];
        private readonly string shopName = TestContext.Parameters["ShopName"];

        private string shop;

        private RestClient restClient;

        [OneTimeSetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);

            this.shop = this.CreateShop();
        }

        [OneTimeTearDown]
        public void TearDown()
        {
            this.DeleteShop(this.shop);
        }

        private string CreateShop()
        {
            var shop = new ShopRequest
            {
                Id = $"{shopName}_{new Random().Next()}"
            };
            var request = ShopRequestHelper.CreateShop(shop);
            var response = this.restClient.Execute<ShopResponse>(request);
            return response.Data.Id;
        }

        private void DeleteShop(string shopId)
        {
            var request = ShopRequestHelper.DeleteShop(shopId);
            var response = this.restClient.Execute(request);
        }

        [Test, Order(1)]
        public void ImportBooks_When_ExcelIsCorrect_ReturnsCreated()
        {
            var request = BookRequestHelper.ImportBooks(this.shop, "test.xlsx", @"Books/test.xlsx");
            var response = this.restClient.Execute<ImportBooksResponse>(request);

            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.AreEqual(7, response.Data.BooksInserted);
            Assert.AreEqual(7, response.Data.TotalBooks);
        }

        [Test, Order(2)]
        public void ImportBooks_When_ExcelIsCorrectButBooksAlreadyExists_ReturnsCreated()
        {
            var request = BookRequestHelper.ImportBooks(this.shop, "test.xlsx", @"Books/test.xlsx");
            var response = this.restClient.Execute<ImportBooksResponse>(request);

            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.AreEqual(0, response.Data.BooksInserted);
            Assert.AreEqual(7, response.Data.TotalBooks);
        }

        [Test]
        public void ImportBooks_When_NoShopSent_ReturnsBadRequest()
        {
            var request = BookRequestHelper.ImportBooks(null, "test.xlsx", @"Books/test.xlsx");
            var response = this.restClient.Execute<ImportBooksResponse>(request);

            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}