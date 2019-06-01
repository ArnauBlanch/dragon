using Dragon.Domain.Models;
using Dragon.Serverless.API.Mappers.Contracts;
using Dragon.Serverless.API.Models.Response;

namespace Dragon.Serverless.API.Mappers.Implementations
{
    public class SaleMapper : ISaleMapper
    {
        public SaleResponse Convert(Sale source)
        {
            if (source == null)
                return null;

            var result = new SaleResponse
            {
                ISBN = source.ISBN,
                Date = source.Date,
                Seller = source.Seller
            };

            return result;
        }
    }
}
