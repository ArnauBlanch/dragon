using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Dragon.API.Mappers;
using Dragon.Application.Services.Contracts;
using Dragon.Application.Services.Implementations;
using Dragon.Infrastructure.Mappers.Contracts;
using Dragon.Infrastructure.Mappers.Implementations;
using Dragon.Infrastructure.Repository.Contracts;
using Dragon.Infrastructure.Repository.Implementations;
using Dragon.Infrastructure.Services.Contracts;
using Dragon.Infrastructure.Services.Implementations;

namespace Dragon
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddSingleton<IBookResponseMapper, BookResponseMapper>();
            services.AddSingleton<IBookRowMapper, BookRowMapper>();
            services.AddSingleton<ISaleRowMapper, SaleRowMapper>();

            services.AddSingleton<IBookAppService, BookAppService>();

            services.AddSingleton<IInventoryRepository, InventoryRepository>();
            services.AddSingleton<ISalesRepository, SalesRepository>();
            services.AddSingleton<IGoogleSheetsService, GoogleSheetsService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
