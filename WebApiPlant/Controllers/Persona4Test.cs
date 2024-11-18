namespace WebApiPlant.Controllers;

/// <summary>
/// Clase que representa un modelo para Persona4Test.
/// </summary>
public class Persona4Test
{
    public string? Nombre { get; set; }
    public string? ApPaterno { get; set; }
    public string? ApMaterno { get; set; }
    public DateTime? FechaNacimiento { get; set; }
    public string? Sexo { get; set; }
    public string? Telefono { get; set; }
    public string? CorreoElectronico { get; set; }
    public decimal? Saldo { get; set; }
    public bool? Activo { get; set; }
    public string? Comentarios { get; set; }
}
