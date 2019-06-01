using Dragon.Serverless.API.IntegrationTests.Helpers;
using Dragon.Serverless.API.Models.Request;
using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Books
{
    public class CreateBook
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];
        private readonly string shopName = TestContext.Parameters["ShopName"];

        private const int EXISTING_BOOK = 100;

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void When_NewBookCreated_ReturnsCreated()
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

            Assert.AreEqual(HttpStatusCode.Created, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.AreEqual(newBook.ISBN, response.Data.ISBN);
            Assert.AreEqual(newBook.Title, response.Data.Title);
        }

        [Test]
        public void When_BookAlreadyExists_ReturnsConflict()
        {
            var newBook = new BookRequest
            {
                ISBN = EXISTING_BOOK,
                Title = "Existing Book",
                Author = "Existing Author",
                Publisher = "Existing Publisher",
                CoverUrl = "CoverUrl",
                Price = 10,
                ReducedPrice = 5,
                AvailableCopies = 5,
                TotalCopies = 5
            };

            var request = BookRequestHelper.CreateBook(shopName, newBook);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.Conflict, response.StatusCode);
        }

        [Test]
        public void When_NoBookSent_ReturnsBadRequest()
        {
            var request = BookRequestHelper.CreateBook(shopName, null);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}