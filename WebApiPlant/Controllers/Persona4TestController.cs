using Microsoft.AspNetCore.Mvc;

namespace WebApiPlant.Controllers;

[Route("api/[controller]")]
[ApiController]
public class Persona4TestController : ControllerBase
{
    private readonly Persona4TestService service;

    public Persona4TestController(IConfiguration configuration)
    {
        // Inicializar el servicio con la cadena de conexión
        // Si no hay cadena de conexión en el appsettings.json manda un error
        var connectionString = configuration.GetConnectionString("DefaultConnection") ??
            throw new AccessViolationException("No hay cadena de conexión");
        service = new Persona4TestService(connectionString);
    }

    /// <summary>
    /// Obtiene todos los registros de la tabla Persona4Test.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await service.GetAllAsync();
        return Ok(result);
    }


    /// <summary>
    /// Inserta un nuevo registro en la tabla Persona4Test.
    /// </summary>
    /// <param name="persona">Objeto con los datos de la persona.</param>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Persona4Test persona)
    {
        var rowsAffected = await service.CreateAsync(persona);        
        return Ok(new { Message = "Registro guardado con éxito.", RowsAffected = rowsAffected });
    }

    /// <summary>
    /// Actualiza un registro de Persona4Test por su ID.
    /// </summary>
    /// <param name="id">ID del registro a actualizar.</param>
    /// <param name="persona">Objeto con los nuevos datos de la persona.</param>
    [HttpPost("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Persona4Test persona)
    {
        // Establecer el ID de la persona con el parámetro recibido
        persona.IdPersona = id;

        // Llamar al servicio para actualizar el registro
        var rowsAffected = await service.UpdateAsync(persona);

        if (rowsAffected == 0)
            return NotFound(new { Message = "Registro no encontrado." });

        return Ok(new { Message = "Registro actualizado con éxito.", RowsAffected = rowsAffected });
    }

    /// <summary>
    /// Elimina un registro por su ID en la tabla Persona4Test.
    /// </summary>
    /// <param name="id">ID del registro a eliminar.</param>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var rowsAffected = await service.DeleteAsync(id);

        if (rowsAffected == 0)
            return NotFound(new { Message = "Registro no encontrado." });

        return Ok(new { Message = "Registro eliminado con éxito.", RowsAffected = rowsAffected });
    }
}
