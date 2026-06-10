// Generar una ciudad random

const generarCiudad = (n) => {
    const ciudades = [];

    for (let i = 0; i < n; i++) {
        const fila = [];
        for (let j = 0; j < n; j++) {
            let temperaturaRandom = Math.floor(Math.random() * 51) - 10; // Genera temperaturas entre -10 y 40
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
            fila += ciudad[i][j] + "\t";
        }
        console.log(fila);
    }
}

// Calcular Maxima temperuta de la ciudad

const carcularMaxima = (ciudad) => {
    let max = -Infinity;
    for (let i = 0; i < ciudad.length; i++) {
        for (let j = 0; j < ciudad[i].length; j++) {
            if (ciudad[i][j] > max) {
                max = ciudad[i][j];
            }
        }
    }
    return max;
}

// Calcular media de la temperatura de la ciudad 

const calcularMedia = (ciudad) => {
    let sumaTotal = 0;
    const totalZonas = ciudad.length * ciudad.length;

    for (let i = 0; i < ciudad.length; i++) {
        sumaTotal += ciudad[i].reduce((suma, temp) => suma + temp, 0);
    }
    return sumaTotal / totalZonas;
}