using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Books
{
    public class UpdateBook
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];
        private readonly string shopName = TestContext.Parameters["ShopName"];

        private const int EXISTING_BOOK = 100;
        private const int NON_EXISTING_BOOK = 99999;

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void When_BookUpdated_ReturnsOk()
        {
            var ticks = DateTime.UtcNow.Ticks;
            var updatedBook = new BookRequest
            {
                ISBN = EXISTING_BOOK,
                Title = "Existing Book",
                Author = "Existing Author",
                Publisher = "Existing Publisher",
                CoverUrl = $"{ticks}",
                Price = 10,
                ReducedPrice = 5,
                AvailableCopies = 5,
                TotalCopies = 5
            };

            var request = BookRequestHelper.UpdateBook(shopName, updatedBook.ISBN, updatedBook);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.AreEqual(updatedBook.ISBN, response.Data.ISBN);
            Assert.AreEqual(updatedBook.Title, response.Data.Title);
            Assert.AreEqual(updatedBook.CoverUrl, response.Data.CoverUrl);
        }

        [Test]
        public void When_BookUpdatedWithDifferentISBN_ReturnsBadRequest()
        {
            var ticks = DateTime.UtcNow.Ticks;
            var updatedBook = new BookRequest
            {
                ISBN = EXISTING_BOOK + 1,
                Title = "Existing Book",
                Author = "Existing Author",
                Publisher = "Existing Publisher",
                CoverUrl = $"{ticks}",
                Price = 10,
                ReducedPrice = 5,
                AvailableCopies = 5,
                TotalCopies = 5
            };

            var request = BookRequestHelper.UpdateBook(shopName, EXISTING_BOOK, updatedBook);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public void When_BookDoesNotExist_ReturnsNotFound()
        {
            var updatedBook = new BookRequest
            {
                ISBN = NON_EXISTING_BOOK,
                Title = "Non Existing Book",
                Author = "Non Existing Author",
                Publisher = "Non Existing Publisher",
                CoverUrl = null,
                Price = 10,
                ReducedPrice = 5,
                AvailableCopies = 5,
                TotalCopies = 5
            };

            var request = BookRequestHelper.UpdateBook(shopName, NON_EXISTING_BOOK, updatedBook);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}