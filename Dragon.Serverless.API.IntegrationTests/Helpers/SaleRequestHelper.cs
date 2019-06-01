using NUnit.Framework;
using RestSharp;

namespace Dragon.Serverless.API.IntegrationTests.Helpers
{
    public static class SaleRequestHelper
    {
        private static readonly string authHeader = TestContext.Parameters["AuthHeader"];
        private static readonly string apiKey = TestContext.Parameters["ApiKey"];

        private static readonly string getAllSalesEndpoint = TestContext.Parameters["GetAllSalesEndpoint"];
        private static readonly string getBookSalesEndpoint = TestContext.Parameters["GetBookSalesEndpoint"];
        private static readonly string sellBookEndpoint = TestContext.Parameters["SellBookEndpoint"];
        private static readonly string sellBookWithoutSellerEndpoint = TestContext.Parameters["SellBookWithoutSellerEndpoint"];
        private static readonly string unsellBookEndpoint = TestContext.Parameters["UnsellBookEndpoint"];

        public static IRestRequest GetAllSales(string shop)
        {
            var resource = string.Format(getAllSalesEndpoint, shop);
            var request = new RestRequest(resource, Method.GET, DataFormat.Json)
                .WithAuth();

            return request;
        }

        public static IRestRequest GetBookSales(string shop, long isbn)
        {
            var resource = string.Format(getBookSalesEndpoint, shop, isbn);
            var request = new RestRequest(resource, Method.GET, DataFormat.Json)
                .WithAuth();

            return request;
        }

        public static IRestRequest SellBook(string shop, long isbn, string seller)
        {
            var resource = string.IsNullOrEmpty(seller) ?
                string.Format(sellBookWithoutSellerEndpoint, shop, isbn) :
                string.Format(sellBookEndpoint, shop, isbn, seller);
            var request = new RestRequest(resource, Method.POST, DataFormat.Json)
                .WithAuth();

            return request;
        }

        public static IRestRequest UnsellBook(string shop, long isbn, string date)
        {
            var resource = string.Format(unsellBookEndpoint, shop, isbn, date);
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
