using Dragon.Serverless.API.Models.Request;
using NUnit.Framework;
using RestSharp;

namespace Dragon.Serverless.API.IntegrationTests.Helpers
{
    public static class ShopRequestHelper
    {
        private static readonly string authHeader = TestContext.Parameters["AuthHeader"];
        private static readonly string apiKey = TestContext.Parameters["ApiKey"];

        private static readonly string getShopEndpoint = TestContext.Parameters["GetShopEndpoint"];
        private static readonly string getAllShopsEndpoint = TestContext.Parameters["GetAllShopsEndpoint"];
        private static readonly string createShopEndpoint = TestContext.Parameters["CreateShopEndpoint"];
        private static readonly string updateShopEndpoint = TestContext.Parameters["UpdateShopEndpoint"];
        private static readonly string deleteShopEndpoint = TestContext.Parameters["DeleteShopEndpoint"];
        private static readonly string activateShopEndpoint = TestContext.Parameters["ActivateShopEndpoint"];
        private static readonly string deactivateShopEndpoint = TestContext.Parameters["DeactivateShopEndpoint"];


        public static IRestRequest GetShop(string shop)
        {
            var resource = string.Format(getShopEndpoint, shop);
            var request = new RestRequest(resource, Method.GET, DataFormat.Json)
                .WithAuth();

            return request;
        }

        public static IRestRequest GetAllShops()
        {
            var request = new RestRequest(getAllShopsEndpoint, Method.GET, DataFormat.Json)
                .WithAuth();

            return request;
        }

        public static IRestRequest CreateShop(ShopRequest shop)
        {
            var request = new RestRequest(createShopEndpoint, Method.POST, DataFormat.Json)
                .WithAuth();

            if (shop != null)
                request.AddJsonBody(shop);

            return request;
        }

        public static IRestRequest UpdateShop(string shopName, ShopRequest shop)
        {
            var resource = string.Format(updateShopEndpoint, shopName);
            var request = new RestRequest(resource, Method.PUT, DataFormat.Json)
                .WithAuth();

            if (shop != null)
                request.AddJsonBody(shop);

            return request;
        }

        public static IRestRequest DeleteShop(string shopName)
        {
            var resource = string.Format(deleteShopEndpoint, shopName);
            var request = new RestRequest(resource, Method.DELETE, DataFormat.Json)
                .WithAuth();

            return request;
        }

        public static IRestRequest ActivateShop(string shopName, bool? force)
        {
            var resource = string.Format(activateShopEndpoint, shopName);
            var request = new RestRequest(resource, Method.POST, DataFormat.Json)
                .WithAuth();
            if (force.HasValue)
                request = request.AddQueryParameter("force", force.Value.ToString());

            return request;
        }

        public static IRestRequest DeactivateShop(string shopName)
        {
            var resource = string.Format(deactivateShopEndpoint, shopName);
            var request = new RestRequest(resource, Method.POST, DataFormat.Json)
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
