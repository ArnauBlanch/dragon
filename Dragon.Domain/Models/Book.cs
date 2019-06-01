namespace Dragon.Domain.Models
{
    public class Book
    {
        public long ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Category { get; set; }
        public string CoverUrl { get; set; }
        public string Publisher { get; set; }
        public float Price { get; set; }
        public float ReducedPrice { get; set; }
        public int TotalCopies { get; set; }
        public int AvailableCopies { get; set; }
    }
}
