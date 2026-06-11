let tam = 0 ;

let tamCorrecto = false;

while (!tamCorrecto) {
    let entrada = prompt("Ingrese el tamaño de la ciudad entre 3 y 10:");
    tam = parseInt(entrada);
    // Añadir console.log
    
    if (tam >= 3 && tam <= 10) {
        tam = tam;
        tamCorrecto = true;
    } else {
        console.log("Tamaño no valido, hazlo de nuevo");
    }
}

//Generar una ciudad random
const generarCiudad = (n) => {
    const ciudades = [];

    for (let i = 0; i < n; i++) {
        const fila = [];
        for (let j = 0; j < n; j++) {
            let temperaturaRandom = Math.floor(Math.random() * 46) - 5; 
            fila.push(temperaturaRandom);
        }
        ciudades.push(fila);
    }
    return ciudades;
}

// Mostrar la ciudad
const mostrarCiudad = (ciudad) => {
    console.log("Temperatura de las ciudades: ");

    for (let i = 0; i < ciudad.length; i++) {
        let fila = "";
        for (let j = 0; j < ciudad[i].length; j++) {
            fila += ciudad[i][j] + "°C\t"; 
        }
        console.log(fila);
    }
}

// Calcular Maxima temperatura de la ciudad

const calcularMaxima = (ciudad) => {
    let max = -5;
    for (let i = 0; i < ciudad.length; i++) {
        for (let j = 0; j < ciudad[i].length; j++) {
            if (ciudad[i][j] > max) {
                max = ciudad[i][j];
            }
        }
    }
    return max;
}
// Minimo 

const calcularMinimo = (ciudad) => {
    let min = 40; // Valor máximo posible
    for (let i = 0; i < ciudad.length; i++) {
        for (let j = 0; j < ciudad[i].length; j++) {
            if (ciudad[i][j] < min) {
                min = ciudad[i][j];
            }
        }
    }
    return min;
}

// Calcular media de la temperatura de la ciudad 
const calcularMedia = (matriz) => {
    let sumaTotal = 0;
    const totalZonas = matriz.length * matriz.length;

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            sumaTotal += matriz[i][j]; 
        }
    }
    return (sumaTotal / totalZonas).toFixed(2);
};

// Calcular media fila 
const mediaFila = (matriz, numFila) => {
    const fila = matriz[numFila]; 
    let suma = 0;

    for (let j = 0; j < fila.length; j++) {
        suma += fila[j];
    }
    return (suma / fila.length).toFixed(2); 
};

// Calcular media columna

const mediaColumna = (matriz, numColumna) => {
    let calientes = 0;
    let congelados = 0;

    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] > 30) {
                calientes++;
            }
            if (matriz[i][j] < 0) {
                congeladas++;
            }
        }
    }
}
//Generamos la ciudad 

let miCiudad = generarCiudad(tam);

console.log("Ciudad generada: ");
// Ejecutamos todo de golpe 

console.log("ANALISIS GLOBAL DE LA CIUDAD");

console.log(`\nTemperatura Maxima registrada: ${calcularMaxima(miCiudad)}°C`);
console.log(`\nTemperatura Minima registrada: ${calcularMinima(miCiudad)}°C`);
console.log(`\nTemperatura Media de la ciudad: ${calcularMedia(miCiudad)}°C`);


console.log("\nPRUEBAS ESPECIFICAS DE FILA Y COLUMNA");
console.log(`\nMedia de la Fila 0 (Zona Norte): ${mediaFila(miCiudad, 0)}°C`);
console.log(`\nMedia de la Columna 0 (Zona Oeste): ${mediaColumna(miCiudad, 0)}°C`);