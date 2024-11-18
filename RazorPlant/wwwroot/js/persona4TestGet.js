// URL de la WebAPI
const apiUrl = config.apiUrl + '/persona4test';

// Función para obtener los datos de la API
async function fetchPersonaData() {
    try {
        // Realizar la solicitud GET a la WebAPI
        const response = await fetch(apiUrl);

        // Si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos de la API');
        }

        // Parsear los datos JSON
        const personas = await response.json();

        // Seleccionar el cuerpo de la tabla
        const tableBody = document.querySelector('#personaTable tbody');

        // Limpiar la tabla antes de agregar nuevos datos
        tableBody.innerHTML = '';

        // Iterar sobre las personas y agregar las filas a la tabla
        personas.forEach(persona => {
            const row = document.createElement('tr');

            // Crear celdas para cada columna de la persona
            row.innerHTML = `
                <td><button class="btn-delete" onclick="deletePersona(${persona.IdPersona})">Borrar</button></td>
                <td>${persona.IdPersona}</td>
                <td>${persona.Nombre}</td>
                <td>${persona.ApPaterno}</td>
                <td>${persona.ApMaterno}</td>
                <td>${persona.FechaNacimiento}</td>
                <td>${persona.Sexo}</td>
                <td>${persona.Telefono}</td>
                <td>${persona.CorreoElectronico}</td>
                <td>${persona.Saldo}</td>
                <td>${persona.Activo ? 'Sí' : 'No'}</td>
            `;

            // Agregar la fila a la tabla
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        alert('Hubo un problema al cargar los datos. Intenta más tarde.');
    }
}

// Función para eliminar un registro de la API
async function deletePersona(idPersona) {
    try {
        // Realizar la solicitud DELETE a la WebAPI
        const response = await fetch(`${apiUrl}/${idPersona}`, {
            method: 'DELETE',
        });

        // Si la respuesta es exitosa
        if (response.ok) {
            alert('Persona eliminada correctamente');
            // Volver a cargar la tabla después de la eliminación
            fetchPersonaData();
        } else {
            alert('Hubo un problema al eliminar la persona');
        }
    } catch (error) {
        console.error('Error al eliminar los datos:', error);
        alert('Hubo un problema al eliminar los datos. Intenta más tarde.');
    }
}

// Llamar la función al cargar la página
window.onload = fetchPersonaData;
