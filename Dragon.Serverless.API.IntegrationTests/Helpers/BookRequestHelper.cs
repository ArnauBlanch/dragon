using Dragon.Serverless.API.Models.Request;
using NUnit.Framework;
using RestSharp;

namespace Dragon.Serverless.API.IntegrationTests.Helpers
{
    public static class BookRequestHelper
    {
        private static readonly string authHeader = TestContext.Parameters["AuthHeader"];
        private static readonly string apiKey = TestContext.Parameters["ApiKey"];

        private static readonly string getBookEndpoint = TestContext.Parameters["GetBookEndpoint"];
        private static readonly string getAllBooksEndpoint = TestContext.Parameters["GetAllBooksEndpoint"];
        private static readonly string createBookEndpoint = TestContext.Parameters["CreateBookEndpoint"];
        private static readonly string updateBookEndpoint = TestContext.Parameters["UpdateBookEndpoint"];
        private static readonly string deleteBookEndpoint = TestContext.Parameters["DeleteBookEndpoint"];


        public static IRestRequest GetBook(string shop, int isbn)
        {
            var resource = string.Format(getBookEndpoint, shop, isbn);
            var request = new RestRequest(resource, Method.GET, DataFormat.Json)
                .WithAuth();

            return request;
        }

        public static IRestRequest GetAllBooks(string shop)
        {
            var resource = string.Format(getAllBooksEndpoint, shop);
            var request = new RestRequest(resource, Method.GET, DataFormat.Json)
                .WithAuth();

            return request;
        }

        public static IRestRequest CreateBook(string shop, BookRequest book)
        {
            var resource = string.Format(createBookEndpoint, shop);
            var request = new RestRequest(resource, Method.POST, DataFormat.Json)
                .WithAuth();

            if (book != null)
                request.AddJsonBody(book);

            return request;
        }

        public static IRestRequest UpdateBook(string shop, int isbn, BookRequest book)
        {
            var resource = string.Format(updateBookEndpoint, shop, isbn);
            var request = new RestRequest(resource, Method.PUT, DataFormat.Json)
                .WithAuth();

            if (book != null)
                request.AddJsonBody(book);

            return request;
        }

        public static IRestRequest DeleteBook(string shop, int isbn)
        {
            var resource = string.Format(deleteBookEndpoint, shop, isbn);
            var request = new RestRequest(resource, Method.DELETE, DataFormat.Json)
                .WithAuth();

            return request;
        }

        private static IRestRequest WithAuth(this IRestRequest request)
        {
            if (!string.IsNullOrWhiteSpace(authHeader))
                request.AddHeader(authHeader, apiKey);

            return request;
        }
    }
}
