// URL de la WebAPI
let apiUrlPost = config.apiUrl + '/persona4test';
//Con null indicamos que se trata de una inserción
let personaActualForma = null;

document.getElementById("btnGuardar").addEventListener("click", onGuardarClick);

async function onGuardarClick(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    debugger
    let Id = null;
    if (personaActualForma) Id = personaActualForma.IdPersona;
    const personaNewData = {
        IdPersona: Id,
        Nombre: document.getElementById("nombre").value,
        ApPaterno: document.getElementById("apPaterno").value,
        ApMaterno: document.getElementById("apMaterno").value,
        FechaNacimiento: document.getElementById("fechaNacimiento").value,
        Sexo: document.getElementById("sexo").value,
        Telefono: document.getElementById("telefono").value,
        CorreoElectronico: document.getElementById("correoElectronico").value,
        Saldo: parseFloat(document.getElementById("saldo").value),
        Activo: document.getElementById("activo").value === 'true',
        Comentarios: document.getElementById("comentarios").value
    };

    try {
        let response;
        response = await fetch(apiUrlGet, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personaNewData)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("responseMessage").innerHTML = `<div class="alert alert-success">${result.message} !</div>`;
        } else {
            const errorResult = await response.json();
            document.getElementById("responseMessage").innerHTML = `<div class="alert alert-danger">Error: ${errorResult.message}</div>`;
        }
    } catch (error) {
        console.error('Error en la petición:', error);
        document.getElementById("responseMessage").innerHTML = `<div class="alert alert-danger">Hubo un problema al guardar los datos.</div>`;
    }
}


// Función para editar un registro y mostrarlo en la modal
function initializeForm(personaActual) {

    if (!personaActual) {
        document.getElementById("personaForm").reset();
        return;
    }

    // Rellenar los campos de la modal con los datos de la persona
    document.getElementById('nombre').value            = personaActual.Nombre;
    document.getElementById('apPaterno').value         = personaActual.ApPaterno;
    document.getElementById('apMaterno').value         = personaActual.ApMaterno;
    
    const fecha = new Date(personaActual.FechaNacimiento);
    // Formatear la fecha como YYYY-MM-DD
    const fechaFormateada = fecha.toISOString().split('T')[0];
    // Asignar el valor formateado al campo
    document.getElementById('fechaNacimiento').value = fechaFormateada;

    document.getElementById('sexo').value              = personaActual.Sexo;
    document.getElementById('telefono').value          = personaActual.Telefono;
    document.getElementById('correoElectronico').value = personaActual.CorreoElectronico;
    document.getElementById('saldo').value             = personaActual.Saldo;
    document.getElementById('activo').value            = personaActual.Activo ? 'true' : 'false';
    document.getElementById('comentarios').value       = personaActual.Comentarios;
}