// URL de la WebAPI
let apiUrlGet = config.apiUrl + '/persona4test';  
//Lista de personas
let personas = null;

// Función para obtener los datos de la API
async function fetchPersonaData() {
    try {
        // Realizar la solicitud GET a la WebAPI
        const response = await fetch(apiUrlGet);

        // Si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('No se pudo obtener los datos de la API');
        }

        // Parsear los datos JSON
        personas = await response.json();

        // Seleccionar el cuerpo de la tabla
        const tableBody = document.querySelector('#personaTable tbody');

        // Limpiar la tabla antes de agregar nuevos datos
        tableBody.innerHTML = '';

        // Iterar sobre las personas y agregar las filas a la tabla
        personas.forEach(persona => {
            const row = document.createElement('tr');

            // Crear celdas para cada columna de la persona
            row.innerHTML = `
                 <td>
                    <table>
                        <tr>
                            <td>
                                <button class="btn-edit" onclick="openEditModal(${persona.IdPersona})">Editar</button>
                            </td>
                            <td>
                                <button class="btn-delete" onclick="deletePersona(${persona.IdPersona})">Borrar</button>
                            </td>
                        </tr>
                    </table>
                </td>
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

// Función para abrir la modal y cargar el formulario de edición
async function openEditModal(id) {
    try {
        // Colocar el contenido en el cuerpo de la modal
        const modalContent = document.getElementById('modalContent');

        //Si no se ha cargado la modal, se carga, si ya se cargó ya está preparada
        if (typeof initializeForm !== 'function') {
            // Realizamos una solicitud GET al CSHTML que devuelve el formulario
            const response = await fetch(`/Persona4TestForma`);

            if (!response.ok) {
                throw new Error('Error al cargar el contenido');
            }

            // Obtener el contenido del formulario como texto
            const data = await response.text();

            //Asignarlo al div del modal
            modalContent.innerHTML = data;

            // Cargar el script con las rutinas de edición
            await loadExternalScript('/js/Persona4TestForma.js');
        }

        // Llamar a la función del script cargado dinámicamente
        //Solo si ya se cargó la función
        if (typeof initializeForm === 'function') {
            // Buscamos la persona a editar e incializamos los campos de la forma
            personaActualForma = personas.find(persona => persona.IdPersona === id);
            //Esta rutina está en /js/Persona4TestForma.js y se cargó dinámicamente con loadExternalScript
            initializeForm(personaActualForma);
        } else {
            console.error("La función 'initializeForm' no está definida en el script.");
        }

        // Mostrar la modal
        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al cargar el formulario de edición.');
    }
}

// Función para cargar un script externo dinámicamente
function loadExternalScript(scriptUrl) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Evento que se ejecuta cuando el modal se cierra completamente
editModal.addEventListener('hidden.bs.modal', function () {
    console.log('El modal se ha cerrado.');
    //Este está en Persona4TestForma.cshtml, se cargó dinámicamente con el fetch
    document.getElementById("responseMessage").innerHTML = ``;
    //Volvemos a refrescar la tabla
    fetchPersonaData();
});

// Función para eliminar un registro de la API
async function deletePersona(idPersona) {
    try {
        // Realizar la solicitud DELETE a la WebAPI
        const response = await fetch(`${apiUrlGet}/${idPersona}`, {
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

// Rutinas al terminar de cargar la página
document.addEventListener("DOMContentLoaded", () => {
    console.log(document.getElementById("btnNew"));

    //Asignación del evento onclick al botón btnNew
    const btnNew = document.getElementById("btnNew");
    if (btnNew) {
        btnNew.addEventListener("click", () => {
            openEditModal(null);
        });
    } else {
        console.error("El botón con ID 'btnNew' no existe.");
    }

    //Cargamos la tabla
    fetchPersonaData();
});
