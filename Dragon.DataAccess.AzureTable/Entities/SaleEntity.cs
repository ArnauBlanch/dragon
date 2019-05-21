using Microsoft.Azure.Cosmos.Table;

namespace Dragon.DataAccess.Entities
{
    public class SaleEntity : TableEntity
    {
        public string Seller { get; set; }
    }
}
