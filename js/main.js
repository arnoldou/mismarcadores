document
  .getElementById("formulario")
  .addEventListener("submit", guardarMarcador);
function guardarMarcador(e) {
  let nombreSitio = document.getElementById("nombreSitio").value;
  let urlSitio = document.getElementById("urlSitio").value;

  let marcador = {
    nombre: nombreSitio,
    url: urlSitio
  };

  console.log(marcador);

  if (localStorage.getItem("marcadores") === null) {
    let marcadores = [];
    marcadores.push(marcador);
    localStorage.setItem("marcadores", JSON.stringify(marcadores));
    console.log(marcadores);
  } else {
    let marcadores = JSON.parse(localStorage.getItem("marcadores"));
    marcadores.push(marcador);
    localStorage.setItem("marcadores", JSON.stringify(marcadores));
    console.log(marcadores);
    document.getElementById("respuesta").innerHTML = "";
    recuperarMarcadores();
  }

  e.preventDefault();
}

function borrarMarcadores(nombre) {
  //console.log(nombre);
  var marcadores = JSON.parse(localStorage.getItem("marcadores"));
  
  for (var i = 0; i < marcadores.length; i++) {
    if (marcadores[i].nombre == nombre) {
      // Remover del array
      marcadores.splice(i, 1);
    }
  }
  
  localStorage.setItem("marcadores", JSON.stringify(marcadores));
  
  recuperarMarcadores();
}

function recuperarMarcadores() {
  let respuesta = JSON.parse(localStorage.getItem("marcadores"));

  document.getElementById('respuesta-filas').innerHTML = "";
  for (let i = 0; i < respuesta.length; i++) {
    document.getElementById("respuesta-filas").innerHTML +=
      "<tr><td>" +
      respuesta[i].nombre +
      '</td><td><a class="btn btn-warning btn-sm" target="_blank" href="' +
      respuesta[i].url +
      '">Visitar</a></td><td><a onclick="borrarMarcadores(\''+ respuesta[i].nombre +'\');" class="btn btn-danger btn-sm href="#">Borrar</a></td></tr>';

    console.log(respuesta[i].nombre + " - " + respuesta[i].url);
  }
}