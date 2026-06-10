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

// Procesamiento de datos y muestra de resultados

console.log("Historial de las plantass solicitadas: ", peticiones);

// Planta maxima y planta minima

let plantaMaxima = Math.max(...peticiones);
let plantaMinima = Math.min(...peticiones);

console.log("Planta maxima solicitada: " + plantaMaxima);
console.log("Planta minima solicitada: " + plantaMinima);

// Plantas solicitadas 

console.log("\n Plantas solicitadas: ");

   for (let i = 0; i <= 9; i++) {
    let veces = peticiones.filter(piso => piso === i).length;

        if (veces > 0) {
            console.log(`Planta ${i}: ${veces} veces`);
        }

}

//Solicitudes ordenadas de mayor a menor 

const porEncima = peticiones.filter(p => p > plantaActual).length;
const porDebajo = peticiones.filter(p => p < plantaActual).length;

console.log("\n Solicitudes ordenadas de mayor a menor: ");

console.log(`\n Por encima de la planta actual:  (${plantaActual}): ${porEncima}`);
console.log(`\n Por debajo de la planta actual:  (${plantaActual}): ${porDebajo}`);

// Plantas sin repetir 

const plantasUnicas = peticiones.filter((piso, index) => peticiones.indexOf(piso) === index);

console.log("\n Plantas sin repetir: ", plantasUnicas);