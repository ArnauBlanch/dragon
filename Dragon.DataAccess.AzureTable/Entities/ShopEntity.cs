using Microsoft.Azure.Cosmos.Table;

namespace Dragon.DataAccess.Entities
{
    public class ShopEntity : TableEntity
    {
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; }
    }
}
