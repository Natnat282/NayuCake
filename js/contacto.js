document.addEventListener("DOMContentLoaded", function() {
    loadData();

    document.getElementById("miFormulario").addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de inmediato
        const edad = calcularEdad();
        const formData = new FormData(this); // Obtiene todos los datos del formulario

        let nombre = this.name.value;
        let correo = this.email.value; 

        // Guardar datos en localStorage
        guardarDatos(nombre, correo);

        // Agrega la edad al FormData
        formData.append("edad", edad);

      if(edad> 18){
        fetch(this.action, {
            method: this.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                this.reset(); // Reinicia el formulario
            } else {
                alert("Hubo un problema al enviar el mensaje, intenta de nuevo.");
            }
        }).catch(error => {
            alert("Error: " + error.message);
        });

    }else{
        alert("Debes ser mayor de edad para enviar el formulario.");
    }
    });
});

function calcularEdad() {
    const fechaN = document.getElementById("date").value;
    const hoy = new Date();
    const nacimiento = new Date(fechaN);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad; 
}

function guardarDatos(nombre, correo) {
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("email", correo); 
}

function loadData() {
    // Acceder correctamente a los elementos del DOM
    document.getElementsByName("name")[0].value = localStorage.getItem("nombre") || ""; 
    document.getElementsByName("email")[0].value = localStorage.getItem("email") || ""; 
}