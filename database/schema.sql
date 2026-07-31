-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'TcitChallengeDB')
BEGIN
    CREATE DATABASE TcitChallengeDB;
END
GO

USE TcitChallengeDB;
GO

-- Crear la tabla Posts
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Posts]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Posts] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Nombre] NVARCHAR(255) NOT NULL,            -- Nombre del post
        [Descripcion] NVARCHAR(MAX) NOT NULL,       -- Descripción
        [Resumen] NVARCHAR(500) NULL,               -- Resumen / Palabras clave
        [FechaCreacion] DATETIME DEFAULT GETDATE()  -- Fecha de creación
    );
END
GO

-- Opcional: Insertar un dato semilla (seeder) de prueba
INSERT INTO [dbo].[Posts] ([Nombre], [Descripcion], [Resumen])
VALUES ('POST 1', 'Hola como están', 'Saludo inicial');
GO