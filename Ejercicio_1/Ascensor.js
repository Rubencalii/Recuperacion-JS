// Datos principales asscensor

let plantaActual = 0;
const peticiones = [];

console.log(" Ascensor: ");

// Planta Actual debe esstar entre el 0 y el 9

let plantaInicial = false;

while (!plantaInicial) {
    let entrada = prompt("Ingrese la planta actual 0 y el 9:");
    let planta = parseInt(entrada);

    if (planta >= 0 && planta <= 9) {
        plantaActual = planta;
        plantaInicial = true;
    } else {
        console.log("Planta no valida, hazlo de nuevo");
    }
}

console.log("Planta actual: " + plantaActual);

// Solicitar de nuevo la peticion

let contadorPeticiones = 0;

while (contadorPeticiones < 10) {
    let entrada = prompt(`[Petición ${contadorPeticiones + 1} de 10] ¿A qué planta se dirige el ascensor? (0-9):`);
    let piso = parseInt(entrada);

    if (!isNaN(piso) && piso >= 0 && piso <= 9) {
        peticiones.push(piso);
        contadorPeticiones++;
    } else {
        console.log("Planta no valida, hazlo de nuevo");
    }
}