using Serilog;
using System.Net;
using System.Text.Json;

namespace WebApiPlant.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            // Logueamos la excepción de manera detallada para el desarrollo o debugging
            Log.Error(ex, "Se produjo una excepción no controlada.");

            // Retornamos una respuesta estándar para el cliente sin detalles sensibles
            await HandleExceptionAsync(context);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        // Respuesta de error simplificada sin detalles sensibles
        var response = new
        {
            context.Response.StatusCode,
            Message = "Ocurrió un error en el servidor. Por favor, repórtalo al administrador.",
            // En un entorno de desarrollo podemos incluir más detalles, en producción no se debe exponer información sensible
            // Detailed = exception.Message // Comentado para no mostrar detalles en producción
        };

        var jsonResponse = JsonSerializer.Serialize(response);

        return context.Response.WriteAsync(jsonResponse);
    }
}