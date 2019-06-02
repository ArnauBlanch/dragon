using Dragon.External.BookSpider.Services.Contracts;
using HtmlAgilityPack;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace Dragon.External.BookSpider.Services.Implementations
{
    public class BookFinderService : IBookFinderService
    {
        private readonly HttpClient httpClient;
        private readonly ILogger<BookFinderService> logger;

        public BookFinderService(ILogger<BookFinderService> iLogger)
        {
            this.httpClient = new HttpClient();
            this.logger = iLogger ?? throw new ArgumentNullException(nameof(iLogger));
        }

        public async Task<BookInfo> GetBookInfoAsync(long isbn)
        {
            Thread.Sleep(50);
            try
            {
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

                if (!long.TryParse(isbnText?.InnerText?.Trim(new[] { ' ', '/' }), out long isbnCode)
                    || isbn != isbnCode)
                    return null;

                var bookInfo = new BookInfo
                {
                    ISBN = isbn,
                    Title = title?.InnerText,
                    Author = author?.InnerText,
                    Publisher = publisher?.InnerText,
                    CoverUrl = cover?.Value
                };

                if (bookInfo.ISBN != isbn)
                    return null;

                return bookInfo;
            }
            catch (Exception ex)
            {
                this.logger.LogError("Could not get book info", ex);
                return null;
            }
        }
    }
}
