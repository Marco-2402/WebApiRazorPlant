using Serilog;
using WebApiPlant.Middleware;

namespace WebApiPlant;

public static class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        // Configurar Serilog desde appsettings.json
        builder.Host.UseSerilog((context, services, configuration) =>
            configuration.ReadFrom.Configuration(context.Configuration));

        // Configurar CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins", policy =>
            {
                policy.AllowAnyOrigin()  // Permite cualquier origen (�til para desarrollo)
                      .AllowAnyMethod()  // Permite cualquier m�todo HTTP (GET, POST, etc.)
                      .AllowAnyHeader(); // Permite cualquier encabezado
            });

            options.AddPolicy("AllowSpecificOrigins", policy =>
            {
                policy.WithOrigins("https://localhost:7086")  // Permite solo �ste origen
                      .AllowAnyMethod()  // Permite cualquier m�todo HTTP (GET, POST, etc.)
                      .AllowAnyHeader(); // Permite cualquier encabezado
            });
        });

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();
        
        app.UseMiddleware<ExceptionMiddleware>();

        // Configurar el flujo de solicitudes HTTP
        if (app.Environment.IsDevelopment())
        {
            //app.UseDeveloperExceptionPage(); // En desarrollo, mostramos una p�gina de error detallada.
            // Usar CORS con una de las pol�ticas definidas previamente
            app.UseCors("AllowAllOrigins");
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            // En producci�n, no mostramos detalles completos de los errores, solo un error gen�rico
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts(); // Seguridad adicional para HTTPS
            // Usar CORS con una de las pol�ticas definidas previamente
            app.UseCors("AllowSpecificOrigins");
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
