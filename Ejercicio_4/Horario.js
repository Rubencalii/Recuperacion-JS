// Elemento del DOM
const formulario = document.getElementById("formularioHorario");
const inputAsignatura = document.getElementById("asignatura");
const selectDia = document.getElementById("diaSemana");
const selectHora = document.getElementById("horaTramo");
const cuerpoTabla = document.getElementById("cuerpoTabla");

// Mapeo de texto de las horas

const textosHoras = {
    "1": "08:15 - 09:15",
    "2": "09:15 - 10:15",
    "3": "10:15 - 11:15",
    "4": "11:45 - 12:45",
    "5": "12:45 - 13:45",
    "6": "13:45 - 14:45"
};

// Base de localStorage

let misClases = JSON.parse(localStorage.getItem("horarioEscolar")) || [];

// Evento del submit para añadir clase

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const asignatura = inputAsignatura.ariaValueMax.trim();
    const  dia = selectDia.value;
    const  hora = selectHora.value;

    // Control de que no haya esa clase en ese dia 
    
    let horarioOcupado = false;
    for (let i = 0; i < misClases.length; i++) {
        if (misClases[i].dia === dia && misClases[i].hora === hora) {
            horaOcupada = true ;
        }
        
    }
    if (horaOcupada) {
        alert("Ya hay una asignatura en ese dia");
        return;
    }

    // Si la hora esta libre
    
    const nuevaClase = {
        asignatura: asignatura,
        dia: dia,
        hora: hora
    };

    // Guardamos en el array haciendo el push

    misClases.push(nuevaClase);

    //  Ahora lo guardamos en el localStorage

    localStorage.setItem('horarioEscolar', JSON.stringify(misClases));

    // Actualizamos y reseteamos los formularios

    renderizarTable();
    formulario.resety();
});