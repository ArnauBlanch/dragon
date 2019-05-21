using Microsoft.Azure.Cosmos.Table;

namespace Dragon.DataAccess.Entities
{
    public class InventoryItemEntity : TableEntity
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string CoverUrl { get; set; }
        public string Publisher { get; set; }
        public double Price { get; set; }
        public double ReducedPrice { get; set; }
        public int TotalCopies { get; set; }
        public int AvailableCopies { get; set; }
    }
}
