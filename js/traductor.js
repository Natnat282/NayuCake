// Espera a que el documento esté completamente cargado antes de ejecutar el código
$(document).ready(function () {
    // Asigna un evento 'change' al elemento con id 'targetLang'
    $('#targetLang').change(function ()  {
        translatePage();
    });

    // Define la función que se encargará de traducir el contenido
    function translatePage() {
        // Selecciona los elementos que deseas traducir (h2, h4, h5, p)
        const textElements = $("h2, h4, h5, p, span");
        // Obtiene el idioma seleccionado del menú desplegable
        const targetLanguage = $('#targetLang').val();
        // Crea un array para almacenar los textos que se van a traducir
        const textsToTranslate = [];

        // Recorre cada elemento seleccionado y agrega su texto al array
        textElements.each(function () {
            textsToTranslate.push($(this).text());
        });

        // Crea el cuerpo de la solicitud con los textos y el idioma objetivo
        const body = { q: textsToTranslate, target: targetLanguage };

        // Realiza una solicitud AJAX a la API de Google Translate
        $.ajax({
            
            url: `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDlkYy5TP0TRKQlY468zvwFk7Ir4wG6wIA`,
            type: 'POST', // Método de la solicitud
            contentType: 'application/json', // Tipo de contenido de la solicitud
            // Convierte el cuerpo a formato JSON
            data: JSON.stringify(body),
            // Función que se ejecuta si la solicitud es exitosa
            success: function (data) {
                // Recorre cada elemento de texto y actualiza su contenido con la traducción
                textElements.each(function (index) {
                    $(this).text(data.data.translations[index].translatedText);
                });
            },
            // Función que se ejecuta si hay un error en la solicitud
            error: function (xhr, status, error) {
               
                console.error('Error:', error);
            }
        });
    }
});

$(document).ready(function () {
    // Asigna un evento 'change' al elemento con id 'targetLang'
    $('#targetLangMobile').change(function ()  {
        translatePage();
    });

    // Define la función que se encargará de traducir el contenido
    function translatePage() {
        // Selecciona los elementos que deseas traducir (h2, h4, h5, p)
        const textElements = $("h2, h4, h5, p, span");
        // Obtiene el idioma seleccionado del menú desplegable
        const targetLanguage = $('#targetLangMobile').val();
        // Crea un array para almacenar los textos que se van a traducir
        const textsToTranslate = [];

        // Recorre cada elemento seleccionado y agrega su texto al array
        textElements.each(function () {
            textsToTranslate.push($(this).text());
        });

        // Crea el cuerpo de la solicitud con los textos y el idioma objetivo
        const body = { q: textsToTranslate, target: targetLanguage };

        // Realiza una solicitud AJAX a la API de Google Translate
        $.ajax({
            
            url: `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDlkYy5TP0TRKQlY468zvwFk7Ir4wG6wIA`,
            type: 'POST', // Método de la solicitud
            contentType: 'application/json', // Tipo de contenido de la solicitud
            // Convierte el cuerpo a formato JSON
            data: JSON.stringify(body),
            // Función que se ejecuta si la solicitud es exitosa
            success: function (data) {
                // Recorre cada elemento de texto y actualiza su contenido con la traducción
                textElements.each(function (index) {
                    $(this).text(data.data.translations[index].translatedText);
                });
            },
            // Función que se ejecuta si hay un error en la solicitud
            error: function (xhr, status, error) {
               
                console.error('Error:', error);
            }
        });
    }
});

