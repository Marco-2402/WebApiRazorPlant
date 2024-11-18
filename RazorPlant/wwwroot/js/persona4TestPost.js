// URL de la WebAPI
const apiUrl = config.apiUrl + '/persona4test';
document.getElementById("personaForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const personaData = {
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
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(personaData)
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("responseMessage").innerHTML = `<div class="alert alert-success">Persona guardada con éxito!</div>`;
            document.getElementById("personaForm").reset();
        } else {
            const errorResult = await response.json();
            document.getElementById("responseMessage").innerHTML = `<div class="alert alert-danger">Error: ${errorResult.message}</div>`;
        }
    } catch (error) {
        console.error('Error en la petición:', error);
        document.getElementById("responseMessage").innerHTML = `<div class="alert alert-danger">Hubo un problema al guardar los datos.</div>`;
    }
});
