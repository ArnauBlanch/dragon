using System;

namespace Dragon.Domain.Models
{
    public class Sale
    {
        public long ISBN { get; set; }
        public DateTime Date { get; set; }
        public string Seller { get; set; }
    }
}
