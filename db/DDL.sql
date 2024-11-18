DROP TABLE Persona4Test
GO
CREATE TABLE Persona4Test (
    IdPersona INT PRIMARY KEY IDENTITY(1,1), -- Identificador único
    Nombre NVARCHAR(255) NOT NULL,          -- Nombre de la persona
    ApPaterno NVARCHAR(255) NOT NULL,       -- Apellido paterno
    ApMaterno NVARCHAR(255) NULL,           -- Apellido materno (puede ser nulo)
    FechaNacimiento DATE NULL,          -- Fecha de nacimiento
    Sexo CHAR(1) NULL,                  -- Sexo ('M' o 'F')
    Telefono VARCHAR(50) NULL,              -- Teléfono
    CorreoElectronico NVARCHAR(320) NULL,   -- Correo electrónico
    Saldo DECIMAL(18,2) DEFAULT 0,          -- Saldo monetario
    Activo BIT NOT NULL DEFAULT 1,          -- Activo (1: Sí, 0: No)
    FechaRegistro DATETIME NOT NULL DEFAULT GETDATE(), -- Fecha de registro
    Comentarios TEXT NULL                   -- Comentarios adicionales
);