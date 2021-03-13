using System.Text;

using ASC.Api.Core;
using ASC.Common;
using ASC.CRM.Api;
using ASC.Web.CRM.HttpHandlers;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ASC.CRM
{
    public class Startup : BaseStartup
    {
        public Startup(IConfiguration configuration, IHostEnvironment hostEnvironment)
             : base(configuration, hostEnvironment)
        {
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

            services.AddMemoryCache();

            base.ConfigureServices(services);

            DIHelper.TryAdd<CasesController>();
            DIHelper.TryAdd<ContactInfosController>();
            DIHelper.TryAdd<ContactsController>();
            DIHelper.TryAdd<CurrencyRatesController>();
            DIHelper.TryAdd<CustomFieldsController>();
            DIHelper.TryAdd<TasksController>();
            DIHelper.TryAdd<DealsController>();
            DIHelper.TryAdd<InvoicesController>();
            DIHelper.TryAdd<ListItemsController>();
            DIHelper.TryAdd<RelationshipEventsController>();
            DIHelper.TryAdd<TagsController>();
            DIHelper.TryAdd<TasksController>();
            DIHelper.TryAdd<TaskTemplateController>();
            DIHelper.TryAdd<UtilsController>();
        }

        public override void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            base.Configure(app, env);

            app.MapWhen(
                context => context.Request.Path.ToString().EndsWith("httphandlers/contactphotohandler.ashx"),
                appBranch =>
                {
                    appBranch.UseContactPhotoHandler();
                });

            app.MapWhen(
              context => context.Request.Path.ToString().EndsWith("httphandlers/filehandler.ashx"),
              appBranch =>
              {
                  appBranch.UseFileHandler();
              });

            app.MapWhen(
              context => context.Request.Path.ToString().EndsWith("httphandlers/fileuploaderhandler.ashx"),
              appBranch =>
              {
                  appBranch.UseFileUploaderHandler();
              });

            app.MapWhen(
              context => context.Request.Path.ToString().EndsWith("httphandlers/importfilehandler.ashx"),
              appBranch =>
              {
                  appBranch.UseImportFileHandlerHandler();
              });

            app.MapWhen(
              context => context.Request.Path.ToString().EndsWith("httphandlers/organisationlogohandler.ashx"),
              appBranch =>
              {
                  appBranch.UseOrganisationLogoHandler();
              });


            app.MapWhen(
              context => context.Request.Path.ToString().EndsWith("httphandlers/webtoleadfromhandler.ashx"),
              appBranch =>
              {
                  appBranch.UseWebToLeadFromHandlerHandler();
              });

        }
    }
}