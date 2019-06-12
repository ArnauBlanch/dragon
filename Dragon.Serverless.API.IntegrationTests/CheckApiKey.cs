using NUnit.Framework;
using RestSharp;
using System.Net;

namespace Dragon.Serverless.API.IntegrationTests
{
    public class CheckApiKey
    {
        private readonly string baseUrl = TestContext.Parameters["ApiBaseUrl"];
        private static readonly string authHeader = TestContext.Parameters["AuthHeader"];
        private static readonly string apiKey = TestContext.Parameters["ApiKey"];

        private static readonly string checkApiKeyEndpoint = TestContext.Parameters["CheckApiKeyEndpoint"];

        private RestClient restClient;

        [SetUp]
        public void SetUp()
        {
            this.restClient = new RestClient(this.baseUrl);
        }

        [Test]
        public void CheckApiKey_WithCorrectApiKey_ReturnsOk()
        {
            if (this.baseUrl.Contains("localhost"))
                return;

            var request = new RestRequest(checkApiKeyEndpoint, Method.GET, DataFormat.Json);
            request.AddHeader(authHeader, apiKey);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }

        [Test]
        public void CheckApiKey_WithoutApiKey_ReturnsUnauthorized()
        {
            if (this.baseUrl.Contains("localhost"))
                return;

            var request = new RestRequest(checkApiKeyEndpoint, Method.GET, DataFormat.Json);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Test]
        public void CheckApiKey_WithIncorrectApiKey_ReturnsUnauthorized()
        {
            if (this.baseUrl.Contains("localhost"))
                return;

            var request = new RestRequest(checkApiKeyEndpoint, Method.GET, DataFormat.Json);
            var response = this.restClient.Execute(request);

            Assert.AreEqual(HttpStatusCode.Unauthorized, response.StatusCode);
        }
    }
}