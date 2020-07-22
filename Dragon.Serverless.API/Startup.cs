using Dragon.Application.Mappers.Contracts;
using Dragon.Application.Mappers.Implementations;
using Dragon.Application.Services.Contracts;
using Dragon.Application.Services.Implementations;
using Dragon.DataAccess.AzureTable.Mappers.Implementations;
using Dragon.DataAccess.AzureTable.Repository.Implementations;
using Dragon.DataAccess.Mappers.Contracts;
using Dragon.DataAccess.Mappers.Implementations;
using Dragon.Domain.Repository;
using Dragon.External.BookSpider.Services.Contracts;
using Dragon.External.BookSpider.Services.Implementations;
using Dragon.Serverless.API.Configuration;
using Dragon.Serverless.API.Mappers.Contracts;
using Dragon.Serverless.API.Mappers.Implementations;
using Dragon.Serverless.Domain.Configuration;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(Dragon.Serverless.API.Startup))]
namespace Dragon.Serverless.API
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {


            builder.Services.AddSingleton<IBookMapper, BookMapper>();
            builder.Services.AddSingleton<ISaleMapper, SaleMapper>();
            builder.Services.AddSingleton<IShopMapper, ShopMapper>();
            builder.Services.AddSingleton<IBookEntityMapper, InventoryItemEntityMapper>();
            builder.Services.AddSingleton<ISaleEntityMapper, SaleEntityMapper>();
            builder.Services.AddSingleton<IShopEntityMapper, ShopEntityMapper>();
            builder.Services.AddSingleton<IInventoryExcelMapper, InventoryExcelMapper>();
            builder.Services.AddSingleton<IBookInfoMapper, BookInfoMapper>();

            builder.Services.AddSingleton<IAppConfiguration, AppConfiguration>();

            builder.Services.AddSingleton<IBookAppService, BookAppService>();
            builder.Services.AddSingleton<ISaleAppService, SaleAppService>();
            builder.Services.AddSingleton<IShopAppService, ShopAppService>();

            builder.Services.AddSingleton<IBookRepository, BookInventory>();
            builder.Services.AddSingleton<ISaleRepository, SaleRepository>();
            builder.Services.AddSingleton<IShopRepository, ShopRepository>();

            builder.Services.AddSingleton<IBookFinderService, BookFinderService>();

        }
    }
}
