document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("miFormulario").addEventListener("submit", function(event) {
        event.preventDefault();
        const edad = calcularEdad();
        const formData = new FormData(this);
        formData.append("edad", edad);

            fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                const output = document.getElementById("output");
                if (response.ok) {
                    this.reset();
                    output.innerHTML = "<div class='alert-info'>¡Registro exitoso!</div>";
                } else {
                    output.innerHTML = "<div class='alert-danger'>¡Error al enviar el registro!</div>";
                }
            }).catch(error => {
                const output = document.getElementById("output");
                output.innerHTML = "<div class='alert-danger'>¡Error al enviar el registro!</div>";
            });
       
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