using Dragon.Serverless.API.Models.Response;
using NUnit.Framework;
using RestSharp;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests.Books
{
    public class GetBook
    {
        private readonly string shopName = TestContext.Parameters["ShopName"];
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];
        private readonly string endpoint = TestContext.Parameters["GetBookEndpoint"];

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void When_BookExists_Returns200()
        {
            var request = GetRequest(shopName, 100);
            var response = this.restClient.Execute<BookResponse>(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(response.Data);
            Assert.AreEqual(100, response.Data.ISBN);
        }

        [Test]
        public void When_BookDoesntExist_Returns404()
        {
            var request = GetRequest(shopName, 999999999);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        public RestRequest GetRequest(string shop, int isbn)
        {
            var resource = string.Format(this.endpoint, shop, isbn);
            var result = new RestRequest(resource, Method.GET, DataFormat.Json);

            return result;
        }
    }
}