using System.Threading.Tasks;

namespace Dragon.External.BookSpider.Services.Contracts
{
    public interface IBookFinderService
    {
        Task<BookInfo> GetBookInfoAsync(long isbn);
    }
}
