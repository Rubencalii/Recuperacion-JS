'use strict';

// Elementos del DOM
const formulario = document.getElementById('formularioPeliculas');
const inputPelicula = document.getElementById('nuevaPelicula');
const ulLista = document.getElementById('listaPeliculas');

// Variable global para controlar el nodo del error
let contenedorError = null;

// Mostrar error
const mostrarError = (mensaje) => {
    quitarError();
    contenedorError = document.createElement('p');
    contenedorError.textContent = mensaje;
    contenedorError.style.color = 'red';
    contenedorError.style.fontWeight = 'bold';
    contenedorError.style.margin = '10px 0 0 0';
    formulario.after(contenedorError);
};

// Quitar error
const quitarError = () => {
    if (contenedorError) {
        contenedorError.remove();
        contenedorError = null;
    }
};

// El array vacío para guardar los títulos 
const misPeliculas = [];

// Escuchamos el evento
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    quitarError();

    const titulo = inputPelicula.value.trim(); 
    
    // Validacion vacia
    if(titulo === "") {
        // CORREGIDO: Usamos la función mostrarError
        mostrarError("Escribe el título de una película.");
        return;
    }

    // Duplicados
    let yaExiste = false;
    for (let i = 0; i < misPeliculas.length; i++) {
        if(misPeliculas[i].toLowerCase() === titulo.toLowerCase()) {
            yaExiste = true;
        }
    }

    if(yaExiste) {
        // CORREGIDO: Usamos la función mostrarError
        mostrarError(`La película "${titulo}" ya está en tu lista.`);
        inputPelicula.value = "";
        return;
    }

    // Guardar en el array
    misPeliculas.push(titulo);
    renderizarLista();

    inputPelicula.value = "";
    inputPelicula.focus();
});

// Funcion simplificada
const renderizarLista = () => {
    while(ulLista.firstChild) {
        ulLista.removeChild(ulLista.firstChild);
    }

    for (let i = 0; i < misPeliculas.length; i++) {
        const peliculaActual = misPeliculas[i];
        
        // Creamos el elemento de la lista
        const li = document.createElement("li");

        // Creamos un nodo de texto con el titulo
        const textoPelicula = document.createTextNode(peliculaActual + " ");
        li.appendChild(textoPelicula);

        // Creamos el boton de borrar
        // CORREGIDO: "button" con 'n'
        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Borrar";
        botonBorrar.classList.add("btn-borrar");

        // Le asignamos la funcion de borrado
        botonBorrar.addEventListener("click", () => {
            borrarPelicula(i);
        });

        // Metemos el boton dentro del li y dentro del ul
        li.appendChild(botonBorrar);
        ulLista.appendChild(li);
    }
}

// Funcion borrar pelicula 
const borrarPelicula = (posicion) => {
    quitarError();
    misPeliculas.splice(posicion, 1);
    renderizarLista();
}