// Elementos del DOM
const formulario = document.getElementById('formularioHorario');
const inputAsignatura = document.getElementById('asignatura');
const selectDia = document.getElementById('diaSemana');
const selectHora = document.getElementById('horaTramo');
const cuerpoTabla = document.getElementById('cuerpoTabla');

// Mapa de texto para la primera columna de las horas
const textosHoras = {
    "1": "08:15 - 09:15",
    "2": "09:15 - 10:15",
    "3": "10:15 - 11:15",
    // Recreo 11:15 - 11:45
    "4": "11:45 - 12:45",
    "5": "12:45 - 13:45",
    "6": "13:45 - 14:45"
};

let contenedorError = null;

// Funciones para mostrar errores
const mostrarError = (mensaje) => {
    quitarError();
    contenedorError = document.createElement('p');
    contenedorError.textContent = mensaje;
    contenedorError.style.color = 'red';
    contenedorError.style.fontWeight = 'bold';
    contenedorError.style.margin = '10px 0 0 0';
    formulario.after(contenedorError);
};

const quitarError = () => {
    if (contenedorError) {
        contenedorError.remove();
        contenedorError = null;
    }
};

// Cargar datos de LocalStorage
let misClases = JSON.parse(localStorage.getItem('horarioEscolar')) || [];

// Escuchamos el formulario
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    quitarError();

    const asignatura = inputAsignatura.value.trim();
    const dia = selectDia.value;
    const hora = selectHora.value;

    if (asignatura === "") {
        mostrarError("Escribe el nombre de la asignatura.");
        return;
    }

    // Validación de solapamiento
    let horaOcupada = false;
    for (let i = 0; i < misClases.length; i++) {
        if (misClases[i].dia === dia && misClases[i].hora === hora) {
            horaOcupada = true;
        }
    }

    if (horaOcupada) {
        mostrarError(`Ya tienes una clase asignada el ${dia} a esa hora.`);
        return;
    }

    // Guardar el objeto en el array
    misClases.push({
        asignatura: asignatura,
        dia: dia,
        hora: hora
    });

    // Guardar array actualizado en LocalStorage como texto JSON
    localStorage.setItem('horarioEscolar', JSON.stringify(misClases));

    renderizarTabla();
    formulario.reset();
    inputAsignatura.focus();
});

// Pintar la tabla sin usar innerHTML
const renderizarTabla = () => {
    // Vaciar tabla eliminando
    while (cuerpoTabla.firstChild) {
        cuerpoTabla.removeChild(cuerpoTabla.firstChild);
    }

    const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];

    // Bucle para las 6 filas de horas
    for (let h = 1; h <= 6; h++) {
        const fila = document.createElement('tr');

        // Primera celda: El tramo horario
        const celdaHora = document.createElement('td');
        const negrita = document.createElement('b');
        negrita.textContent = textosHoras[h];
        celdaHora.appendChild(negrita);
        fila.appendChild(celdaHora);

        // Bucle para las 5 celdas de los días
        for (let d = 0; d < dias.length; d++) {
            const diaActual = dias[d];
            const celdaDia = document.createElement('td');

            // Buscar si hay una asignatura para este día y esta hora
            let claseEncontrada = null;
            let indiceEncontrado = -1;

            for (let i = 0; i < misClases.length; i++) {
                if (misClases[i].dia === diaActual && parseInt(misClases[i].hora) === h) {
                    claseEncontrada = misClases[i];
                    indiceEncontrado = i;
                }
            }

            // Si hay clase creamos la estructura
            if (claseEncontrada) {
                const divContenedor = document.createElement('div');
                divContenedor.classList.add('celda-clase');

                const textoAsignatura = document.createElement('b');
                textoAsignatura.textContent = claseEncontrada.asignatura;

                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = "Eliminar";
                botonEliminar.classList.add('btn-borrar-celda');
                
                botonEliminar.addEventListener('click', () => {
                    borrarClase(indiceEncontrado);
                });

                divContenedor.appendChild(textoAsignatura);
                divContenedor.appendChild(botonEliminar);
                celdaDia.appendChild(divContenedor);
            }

            fila.appendChild(celdaDia);
        }

        cuerpoTabla.appendChild(fila);
    }
};

// Funcion para borrar una clase
const borrarClase = (posicion) => {
    quitarError();
    misClases.splice(posicion, 1);
    localStorage.setItem('horarioEscolar', JSON.stringify(misClases));
    renderizarTabla();
};

// Arrancar la tabla al cargar la página por primera vez
renderizarTabla();