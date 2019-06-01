using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Books
{
    public class DeleteBook
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];
        private readonly string shopName = TestContext.Parameters["ShopName"];

        private const int UNEXISTING_BOOK = 99999;

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void DeleteBook_When_BookDeleted_ReturnsNoContent()
        {
            var isbn = this.InsertBook();

            var request = BookRequestHelper.DeleteBook(shopName, isbn);

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Test]
        public void DeleteBook_When_ShopDoesNotExist_ReturnsNotFound()
        {
            var request = BookRequestHelper.DeleteBook("UnexistingShop", 100);

            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public void DeleteBook_When_BookDoesNotExist_ReturnsNotFound()
        {
            var request = BookRequestHelper.DeleteBook(shopName, UNEXISTING_BOOK);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        private int InsertBook()
        {
            var isbn = new Random().Next();
            var newBook = new BookRequest
            {
                ISBN = isbn,
                Title = $"Random Book {isbn}",
                Author = "Random Author",
                Publisher = "Random Publisher",
                CoverUrl = "Random CoverUrl",
                Price = 10,
                ReducedPrice = 5,
                AvailableCopies = 5,
                TotalCopies = 5
            };

            var request = BookRequestHelper.CreateBook(shopName, newBook);
            var response = this.restClient.Execute<BookResponse>(request);
            return response.Data.ISBN;
        }
    }
}