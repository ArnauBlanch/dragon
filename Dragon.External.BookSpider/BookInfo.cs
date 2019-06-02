using System;
using System.Collections.Generic;
using System.Text;

namespace Dragon.External.BookSpider
{
    public class BookInfo
    {
        public long ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string CoverUrl { get; set; }
        public string Publisher { get; set; }
    }
}
