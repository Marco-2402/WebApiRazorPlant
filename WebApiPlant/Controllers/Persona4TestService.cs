using Dapper;
using Serilog;
using System.Data.SqlClient;

namespace WebApiPlant.Controllers;

public class Persona4TestService
{
    private readonly string _connectionString;

    public Persona4TestService(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<IEnumerable<dynamic>> GetAllAsync()
    {
        Log.Information("Iniciando la operación GetAllAsync para obtener todos los registros de Persona4Test.");

        using var connection = new SqlConnection(_connectionString);
        var query = "SELECT * FROM Persona4Test";
        var result = await connection.QueryAsync(query);

        Log.Information("Operación GetAllAsync completada con éxito. Registros obtenidos: {Count}", result.Count());
        return result;
    }

    public async Task<int> CreateAsync(Persona4Test persona)
    {
        Log.Information("Iniciando la operación CreateAsync para insertar un nuevo registro en Persona4Test.");

        using var connection = new SqlConnection(_connectionString);
        var query = @"
            INSERT INTO Persona4Test (Nombre, ApPaterno, ApMaterno, FechaNacimiento, Sexo, Telefono, CorreoElectronico, Saldo, Activo, Comentarios)
            VALUES (@Nombre, @ApPaterno, @ApMaterno, @FechaNacimiento, @Sexo, @Telefono, @CorreoElectronico, @Saldo, @Activo, @Comentarios)";

        var parameters = new
        {
            persona.Nombre,
            persona.ApPaterno,
            persona.ApMaterno,
            persona.FechaNacimiento,
            persona.Sexo,
            persona.Telefono,
            persona.CorreoElectronico,
            persona.Saldo,
            persona.Activo,
            persona.Comentarios
        };

        var rowsAffected = await connection.ExecuteAsync(query, parameters);

        Log.Information("Operación CreateAsync completada con éxito. Registros afectados: {RowsAffected}", rowsAffected);
        return rowsAffected;
    }

    public async Task<int> DeleteAsync(int id)
    {
        Log.Information("Iniciando la operación DeleteAsync para eliminar el registro con IdPersona: {IdPersona}.", id);

        using var connection = new SqlConnection(_connectionString);
        var query = "DELETE FROM Persona4Test WHERE IdPersona = @Id";

        var rowsAffected = await connection.ExecuteAsync(query, new { Id = id });

        Log.Information("Operación DeleteAsync completada con éxito. Registros afectados: {RowsAffected}", rowsAffected);
        return rowsAffected;
    }
}
