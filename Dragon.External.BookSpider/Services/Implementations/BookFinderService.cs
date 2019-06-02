using Dragon.External.BookSpider.Services.Contracts;
using HtmlAgilityPack;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Dragon.External.BookSpider.Services.Implementations
{
    public class BookFinderService : IBookFinderService
    {
        private readonly HttpClient httpClient;

        public BookFinderService()
        {
            this.httpClient = new HttpClient();
        }

        public async Task<BookInfo> GetBookInfoAsync(long isbn)
        {
            Thread.Sleep(50);
            var url = string.Format("https://www.bookfinder.com/search/?keywords={0}&currency=EUR&destination=es&lang=en&st=sh&ac=qr&submit=", isbn.ToString());
            var response = await this.httpClient.GetAsync(url);
            var pageContent = await response.Content.ReadAsStringAsync();

            var pageDoc = new HtmlDocument();
            pageDoc.LoadHtml(pageContent);

            var isbnText = pageDoc.DocumentNode.SelectSingleNode("//*[@id=\"bd-isbn\"]/div/div[2]/div[1]/h1/text()");
            var title = pageDoc.DocumentNode.SelectSingleNode("//*[@id=\"describe-isbn-title\"]");
            var author = pageDoc.DocumentNode.SelectSingleNode("//*[@id=\"bd-isbn\"]/div/div[2]/div[2]/p/strong/a/span");
            var publisher = pageDoc.DocumentNode.SelectSingleNode("//*[@id=\"bd-isbn\"]/div/div[2]/p[1]/span[2]");
            var cover = pageDoc.DocumentNode.SelectSingleNode("//*[@id=\"coverImage\"]")?.Attributes?["src"];

            var bookInfo = new BookInfo
            {
                ISBN = long.Parse(isbnText?.InnerText?.Trim(new[] { ' ', '/' })),
                Title = title?.InnerText,
                Author = author?.InnerText,
                Publisher = publisher?.InnerText,
                CoverUrl = cover?.Value
            };

            if (bookInfo.ISBN != isbn)
                return null;

            return bookInfo;
        }
    }
}
