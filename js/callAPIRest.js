var datos;
	
function CallServiceMenujq(tipo) {
    var uriServer = "datos/cake.json";

    $.ajax({
        url: uriServer,
        type: "get",
        dataType: "json",
        success: function (data, tipo) {
            OnSuccess(data, tipo);
        },
        error: OnError
    });
}

function OnSuccess(data, tipo) {
    datos = data;
    cargarMenu(tipo);
}

function OnError(jqXHR, textStatus, errorThrown) {
    alert(errorThrown);
}

function cargarMenu(tipo) {
    try {
        let idmenu = document.getElementById("menu-container-xs");
        idmenu.innerHTML = ""; 
        let menuItem = ""; 

        // Inicializar moneda en colones
        let moneda = registrarMoneda(2, "");
        let tipoCambio = parseFloat(sessionStorage.getItem("tipoCambio")) || 1.00;

        let simbolo = ""; 
        switch (moneda) {
            case "USD":
              simbolo = "$";
              break;
           
            case "CRC":
              simbolo = "₡";
              break;
          }

        // Agrupar productos en filas
        let rowCount = 0; // Contador de filas
        datos.cakes.forEach((pastel, index) => {
            // Cada 3 productos, inicia una nueva fila
            if (index % 3 === 0) {
                if (rowCount > 0) {
                    menuItem += `</div>`;
                }
                menuItem += `<div class="u-layout-row">`;
                rowCount++;
            }

            // Calcular el monto en colones
            let monto = parseFloat(pastel.price) * tipoCambio;
            let cadenaFormateada = monto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

            // Agregar el producto
            menuItem += `
                <div class="u-container-style u-layout-cell u-radius u-shape-round u-size-20 u-size-20-md u-white u-layout-cell">
                    <div class="u-container-layout u-container-layout">
                        <img class="u-align-center u-image u-image-round u-radius u-image" src="${pastel.image}" alt="" data-image-width="3024" data-image-height="3780">
                        <h4 class="u-text u-text-default u-text-2">${pastel.name}</h4>
                        <a href="${pastel.link}" class="u-align-center u-border-none u-btn u-btn-round u-button-style u-custom-color-3 u-radius u-btn">${simbolo}${cadenaFormateada}</a>
                    </div>
                </div>
            `;
        });

        // Cerrar la última fila si es necesario
        if (rowCount > 0) {
            menuItem += `</div>`;
        }

        idmenu.innerHTML = menuItem; // Agregar todos los elementos generados al contenedor
    } catch (error) {
        alert(error);
    }
}

function callTipoCambio(tipo, moneda) {
    switch (tipo) {
        case 1:
            registrarMoneda(1, "USD");
            let uriServer1 = "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols";
            if (uriServer1 != "") {
                $.ajax({
                    async: true,
                    crossDomain: true,
                    dataType: "json",
                    url: uriServer1,
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "41e3c2aa13mshd1e7fc74501dbefp17ab1fjsn126837791e16",
                        "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com"
                    },
                    success: function (data) {
                        OnSuccessTC(data, tipo, moneda);
                    },
                    error: OnErrorTC
                });
            }
            break;

        case 2:
            registrarMoneda(1, moneda);

            if (moneda != null) {
                let uriServer2 = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=USD&to=${moneda}&amount=1`;

                if (uriServer2 != "") {
                    $.ajax({
                        async: true,
                        crossDomain: true,
                        dataType: "json",
                        url: uriServer2,
                        method: "GET",
                        headers: {
                            "X-RapidAPI-Key": "41e3c2aa13mshd1e7fc74501dbefp17ab1fjsn126837791e16",
                            "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com"
                        },
                        success: function (data) {
                            OnSuccessTC(data, tipo, moneda);
                        },
                        error: OnErrorTC
                    });
                }

              
            }

            break;
    }

    return false;
}

function OnSuccessTC(data, tipo, moneda) {
    var datosTC = data;

    switch (tipo) {
        case 1:
            let opciones = "";
            let tipoCambio = document.getElementById("tipoCambio");

            Object.entries(datosTC.symbols).forEach(([key, value]) => {
                if (key === "USD")
                    opciones += `<option selected class="bg-dark" value="${key}">${value}</option>`;
                else if (key === "CRC")
                    opciones += `<option class="bg-dark" value="${key}">${value}</option>`;
            });

            tipoCambio.innerHTML = opciones;

            break;

        case 2:
            let tcMonto = datosTC.info.rate;
            if (typeof window.sessionStorage !== 'undefined') {
                sessionStorage.setItem("tipoCambio", tcMonto.toString());
                CallServiceMenujq("ALL");
                cargarCakeS("ALL");
                cargarCakeM("ALL");
                cargarCakeL("ALL");
                cargarCakeP("ALL");
                cargarCakeK("ALL");
            } else {
                console.error("El navegador no admite sessionStorage. Considera usar una estrategia alternativa.");
            }

            break;
    }
}

function OnErrorTC(jqXHR, textStatus, errorThrown) {
    alert("Mensaje de Error: " + errorThrown + "\nURL: " + uriServer);
}

function registrarMoneda(tipo, moneda) {
    var valorRecuperado = moneda;
    if (typeof window.sessionStorage !== 'undefined') {
        if (tipo === 1)
            sessionStorage.setItem("moneda", moneda);
        else
            valorRecuperado = sessionStorage.getItem("moneda");
        return valorRecuperado;
    } else {
        console.error("El navegador no admite sessionStorage. Considera usar una estrategia alternativa.");
    }
}
  

 
  //////////////////////////// API REST CAKE S/////////////////////////////////////////////


   var cakeS;

   function CallServiceCakeS(tipo) {
    var uriServer = "datos/scake.json";
  
    $.ajax({
        url: uriServer,
        type: "get",
        dataType: "json",
        success: function(data) {
            OnSuccess2(data, tipo); 
        },
        error: OnError2  
    });
}


function OnSuccess2(data, tipo) {
    console.log("Datos recibidos:", data); 
    cakeS = data;
    cargarCakeS(tipo); 
}

function OnError2(jqXHR, textStatus, errorThrown)
{
  alert(errorThrown);
}

function cargarCakeS(tipo) {
    try {
        let idmenu = document.getElementById("menu-container-s");
        idmenu.innerHTML = ""; 

        let menuItem = ""; 

        let moneda = registrarMoneda(2, "");
        let tipoCambio = parseFloat(sessionStorage.getItem("tipoCambio")) || 1.00;

        let simbolo = ""; 
        switch (moneda) {
            case "USD":
              simbolo = "$";
              break;
           
            case "CRC":
              simbolo = "₡";
              break;
          }

        // Agrupar productos en filas
        let rowCount = 0; 
        cakeS.cakesS.forEach((pastel, index) => {
            // Cada 3 productos, inicia una nueva fila
            if (index % 3 === 0) {
                if (rowCount > 0) {
                    menuItem += `</div></div>`; 
                }
                menuItem += `<div class="u-layout-row">`; 
                rowCount++;
            }

            let monto = parseFloat(pastel.price) * tipoCambio;
            let cadenaFormateada = monto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

            // Agregar el producto
            menuItem += `
                <div class="u-container-style u-layout-cell u-radius u-shape-round u-size-20 u-size-20-md u-white u-layout-cell">
                    <div class="u-container-layout u-container-layout">
                        <img class="u-align-center u-image u-image-round u-radius u-image" src="${pastel.image}" alt="" data-image-width="3024" data-image-height="3780">
                        <h4 class="u-text u-text-default u-text-2">${pastel.name}</h4>
                        <a href="${pastel.link}" class="u-align-center u-border-none u-btn u-btn-round u-button-style u-custom-color-3 u-radius u-btn">${simbolo}${cadenaFormateada}</a>
                    </div>
                </div>
            `;
        });

       
        if (rowCount > 0) {
            menuItem += `</div></div>`;
        }

        idmenu.innerHTML = menuItem;
    } catch (error) {
        alert(error);
    }
}




 //////////////////////////// API REST CAKE M/////////////////////////////////////////////


 var cakeM;

 function CallServiceCakeM(tipo) {
  var uriServer = "datos/mcake.json";

  $.ajax({
      url: uriServer,
      type: "get",
      dataType: "json",
      success: function(data) {
          OnSuccess3(data, tipo); 
      },
      error: OnError3 
  });
}


function OnSuccess3(data, tipo) {
  console.log("Datos recibidos:", data); 
  cakeM = data;
  cargarCakeM(tipo); 
}

function OnError3(jqXHR, textStatus, errorThrown)
{
alert(errorThrown);
}

function cargarCakeM(tipo) {
  try {
      let idmenu = document.getElementById("menu-container-m");
      idmenu.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos elementos

      let menuItem = ""; 

      let moneda = registrarMoneda(2, "");
      let tipoCambio = parseFloat(sessionStorage.getItem("tipoCambio")) || 1.00;

      let simbolo = ""; 
      switch (moneda) {
          case "USD":
            simbolo = "$";
            break;
         
          case "CRC":
            simbolo = "₡";
            break;
        }

      // Agrupar productos en filas
      let rowCount = 0; 
      cakeM.cakesM.forEach((pastel, index) => {
          // Cada 3 productos, inicia una nueva fila
          if (index % 3 === 0) {
              if (rowCount > 0) {
                  menuItem += `</div></div>`; 
              }
              menuItem += `<div class="u-layout-row">`; 
              rowCount++;
          }

          let monto = parseFloat(pastel.price) * tipoCambio;
          let cadenaFormateada = monto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

          // Agregar el producto
          menuItem += `
              <div class="u-container-style u-layout-cell u-radius u-shape-round u-size-20 u-size-20-md u-white u-layout-cell">
                  <div class="u-container-layout u-container-layout">
                      <img class="u-align-center u-image u-image-round u-radius u-image" src="${pastel.image}" alt="" data-image-width="3024" data-image-height="3780">
                      <h4 class="u-text u-text-default u-text-2">${pastel.name}</h4>
                      <a href="${pastel.link}" class="u-align-center u-border-none u-btn u-btn-round u-button-style u-custom-color-3 u-radius u-btn">${simbolo}${cadenaFormateada}</a>
                  </div>
              </div>
          `;
      });

     
      if (rowCount > 0) {
          menuItem += `</div></div>`;
      }

      idmenu.innerHTML = menuItem;
  } catch (error) {
      alert(error);
  }
}


//////////////////////////// API REST CAKE L/////////////////////////////////////////////


var cakeL;

function CallServiceCakeL(tipo) {
 var uriServer = "datos/lcake.json";

 $.ajax({
     url: uriServer,
     type: "get",
     dataType: "json",
     success: function(data) {
         OnSuccess4(data, tipo); 
     },
     error: OnError4 
 });
}


function OnSuccess4(data, tipo) {
 console.log("Datos recibidos:", data); 
 cakeL = data;
 cargarCakeL(tipo); 
}

function OnError4(jqXHR, textStatus, errorThrown)
{
alert(errorThrown);
}

function cargarCakeL(tipo) {
 try {
     let idmenu = document.getElementById("menu-container-l");
     idmenu.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos elementos

     let menuItem = ""; 

     let moneda = registrarMoneda(2, "");
        let tipoCambio = parseFloat(sessionStorage.getItem("tipoCambio")) || 1.00;

        let simbolo = ""; 
        switch (moneda) {
            case "USD":
              simbolo = "$";
              break;
           
            case "CRC":
              simbolo = "₡";
              break;
          }

     // Agrupar productos en filas
     let rowCount = 0; 
     cakeL.cakesL.forEach((pastel, index) => {
         // Cada 3 productos, inicia una nueva fila
         if (index % 3 === 0) {
             if (rowCount > 0) {
                 menuItem += `</div></div>`; 
             }
             menuItem += `<div class="u-layout-row">`; 
             rowCount++;
         }

         let monto = parseFloat(pastel.price) * tipoCambio;
          let cadenaFormateada = monto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

         // Agregar el producto
         menuItem += `
             <div class="u-container-style u-layout-cell u-radius u-shape-round u-size-20 u-size-20-md u-white u-layout-cell">
                 <div class="u-container-layout u-container-layout">
                     <img class="u-align-center u-image u-image-round u-radius u-image" src="${pastel.image}" alt="" data-image-width="3024" data-image-height="3780">
                     <h4 class="u-text u-text-default u-text-2">${pastel.name}</h4>
                     <a href="${pastel.link}" class="u-align-center u-border-none u-btn u-btn-round u-button-style u-custom-color-3 u-radius u-btn">${simbolo}${cadenaFormateada}</a>
                 </div>
             </div>
         `;
     });

    
     if (rowCount > 0) {
         menuItem += `</div></div>`;
     }

     idmenu.innerHTML = menuItem;
 } catch (error) {
     alert(error);
 }
}



//////////////////////////// API REST CAKE Kids/////////////////////////////////////////////


var cakeK;

function CallServiceCakeK(tipo) {
 var uriServer = "datos/kcake.json";

 $.ajax({
     url: uriServer,
     type: "get",
     dataType: "json",
     success: function(data) {
         OnSuccess5(data, tipo); 
     },
     error: OnError5
 });
}


function OnSuccess5(data, tipo) {
 console.log("Datos recibidos:", data); 
 cakeK = data;
 cargarCakeK(tipo); 
}

function OnError5(jqXHR, textStatus, errorThrown)
{
alert(errorThrown);
}

function cargarCakeK(tipo) {
 try {
     let idmenu = document.getElementById("menu-container-k");
     idmenu.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos elementos

     let menuItem = ""; 

     let moneda = registrarMoneda(2, "");
        let tipoCambio = parseFloat(sessionStorage.getItem("tipoCambio")) || 1.00;

        let simbolo = ""; 
        switch (moneda) {
            case "USD":
              simbolo = "$";
              break;
           
            case "CRC":
              simbolo = "₡";
              break;
          }

     // Agrupar productos en filas
     let rowCount = 0; 
     cakeK.cakesK.forEach((pastel, index) => {
         // Cada 3 productos, inicia una nueva fila
         if (index % 3 === 0) {
             if (rowCount > 0) {
                 menuItem += `</div></div>`; 
             }
             menuItem += `<div class="u-layout-row">`; 
             rowCount++;
         }

         let monto = parseFloat(pastel.price) * tipoCambio;
          let cadenaFormateada = monto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

         // Agregar el producto
         menuItem += `
             <div class="u-container-style u-layout-cell u-radius u-shape-round u-size-20 u-size-20-md u-white u-layout-cell">
                 <div class="u-container-layout u-container-layout">
                     <img class="u-align-center u-image u-image-round u-radius u-image" src="${pastel.image}" alt="" data-image-width="3024" data-image-height="3780">
                     <h4 class="u-text u-text-default u-text-2">${pastel.name}</h4>
                     <a href="${pastel.link}" class="u-align-center u-border-none u-btn u-btn-round u-button-style u-custom-color-3 u-radius u-btn">${simbolo}${cadenaFormateada}</a>
                 </div>
             </div>
         `;
     });

    
     if (rowCount > 0) {
         menuItem += `</div></div>`;
     }

     idmenu.innerHTML = menuItem;
 } catch (error) {
     alert(error);
 }
}

//////////////////////////// API REST Postres/////////////////////////////////////////////


var cakeP;

function CallServiceCakeP(tipo) {
 var uriServer = "datos/pcake.json";

 $.ajax({
     url: uriServer,
     type: "get",
     dataType: "json",
     success: function(data) {
         OnSuccess6(data, tipo); 
     },
     error: OnError6
 });
}


function OnSuccess6(data, tipo) {
 console.log("Datos recibidos:", data); 
 cakeP = data;
 cargarCakeP(tipo); 
}

function OnError6(jqXHR, textStatus, errorThrown)
{
alert(errorThrown);
}

function cargarCakeP(tipo) {
 try {
     let idmenu = document.getElementById("menu-container-p");
     idmenu.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos elementos

     let menuItem = ""; 

     let moneda = registrarMoneda(2, "");
        let tipoCambio = parseFloat(sessionStorage.getItem("tipoCambio")) || 1.00;

        let simbolo = ""; 
        switch (moneda) {
            case "USD":
              simbolo = "$";
              break;
           
            case "CRC":
              simbolo = "₡";
              break;
          }

     // Agrupar productos en filas
     let rowCount = 0; 
     cakeP.cakesP.forEach((pastel, index) => {
         // Cada 3 productos, inicia una nueva fila
         if (index % 3 === 0) {
             if (rowCount > 0) {
                 menuItem += `</div></div>`; 
             }
             menuItem += `<div class="u-layout-row">`; 
             rowCount++;
         }

         let monto = parseFloat(pastel.price) * tipoCambio;
          let cadenaFormateada = monto.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });

         // Agregar el producto
         menuItem += `
             <div class="u-container-style u-layout-cell u-radius u-shape-round u-size-20 u-size-20-md u-white u-layout-cell">
                 <div class="u-container-layout u-container-layout">
                     <img class="u-align-center u-image u-image-round u-radius u-image" src="${pastel.image}" alt="" data-image-width="3024" data-image-height="3780">
                     <h4 class="u-text u-text-default u-text-2">${pastel.name}</h4>
                     <a href="${pastel.link}" class="u-align-center u-border-none u-btn u-btn-round u-button-style u-custom-color-3 u-radius u-btn">${simbolo}${cadenaFormateada}</a>
                 </div>
             </div>
         `;
     });

    
     if (rowCount > 0) {
         menuItem += `</div></div>`;
     }

     idmenu.innerHTML = menuItem;
 } catch (error) {
     alert(error);
 }
}
