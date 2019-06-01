using System;

namespace Dragon.Serverless.API.Models.Response
{
    public class SaleResponse
    {
        public long ISBN { get; set; }
        public DateTime Date { get; set; }
        public string Seller { get; set; }
    }
}
