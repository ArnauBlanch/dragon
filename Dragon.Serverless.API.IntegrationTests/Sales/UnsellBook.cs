using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Sales
{
    public class UnsellBook
    {
        private readonly string shopName = TestContext.Parameters["ShopName"];
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];

        private const int EXISTING_BOOK = 100;
        private const int EXISTING_BOOK2 = 101;
        private const int NON_EXISTING_BOOK = 99999;
        private const int FULLY_AVAILABLE_BOOK = 160;

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void When_BookUnsold_ReturnsNoContent()
        {
            var saleDate = this.GetLastSaleDate(shopName, EXISTING_BOOK);

            var request = SaleRequestHelper.UnsellBook(shopName, EXISTING_BOOK, saleDate);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void When_BookUnsold2_ReturnsNoContent()
        {
            var saleDate = this.GetLastSaleDate(shopName, EXISTING_BOOK2);

            var request = SaleRequestHelper.UnsellBook(shopName, EXISTING_BOOK2, saleDate);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void When_BookDoesNotExist_ReturnsNotFound()
        {
            var request = SaleRequestHelper.UnsellBook(shopName, NON_EXISTING_BOOK, DateTime.UtcNow.ToString("o"));
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public void When_InvalidDate_ReturnsBadRequest()
        {
            var request = SaleRequestHelper.UnsellBook(shopName, FULLY_AVAILABLE_BOOK, DateTime.UtcNow.ToString("o"));
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        private string GetLastSaleDate(string shop, int isbn)
        {
            var request = SaleRequestHelper.GetBookSales(shop, isbn);
            var response = this.restClient.Execute<List<SaleResponse>>(request);

            var result = response.Data[0].Date.ToUniversalTime().ToString("o");
            return result;
        }
    }
}