const formContactos = document.querySelector('#form-contacto'),
    listadoContactos = document.querySelector('#tabla-contactos tbody'),
    inputBuscador = document.querySelector('#buscar');


eventListeners();


function eventListeners() {
    //cuando el form de crear o editar se ejecuta
    if (formContactos) {
        formContactos.addEventListener('submit', leerForm);
    }



    //Listener para eliminar el boton
    if (listadoContactos) {
        listadoContactos.addEventListener('click', eliminarContacto);
    }

    //buscador
    inputBuscador.addEventListener('input', buscarContactos);


    //contador contactos
    contadorContactos();

}

function leerForm(e) {
    e.preventDefault();
    //leer los datos de los inputs
    const nombre = document.querySelector('#nombre').value,
        telefono = document.querySelector('#telefono').value,
        email = document.querySelector('#email').value,
        accion = document.querySelector('#accion').value;

    if (nombre === '' || telefono === '' || email === '') {
        //2 parametros: texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        //pasa la validacio, crear llamado a Ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('email', email);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        if (accion === 'crear') {
            //crea un nuevo contacto
            insertarBD(infoContacto);
        } else {
            //editar el contacto
            //leer el id
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);
        }
    }
}

//inserta en la BD via AJAX
function insertarBD(datos) {
    //llamado a AJAX

    //crear objeto
    const xhr = new XMLHttpRequest();

    //abrir conexión
    xhr.open('POST', 'inc/modelos/modelo-contacto.php', true);

    //pasar datos
    xhr.onload = function() {
        if (this.status === 200) {
            /*
            ATENCION A ESTO: en JS no existen los array asociativos, son objetos. JSON.parse se utiliza para convertir el string que devuelve xhr.responseText a un objeto para poder acceder a sus valores.
            */
            //JSON es un formato de trasporte de PHP->JS

            //leemos la respuesta de 
            const respuesta = JSON.parse(xhr.responseText);

            //inserta un nuevo contacto a la tabla  
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.telefono}</td>
                <td>${respuesta.datos.email}</td>
            `;

            //contenedor acciones
            const contenedorAcciones = document.createElement('td');

            //crear icono editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-edit');

            //crea el enlace <a></a>
            const botonEditar = document.createElement('a');
            botonEditar.appendChild(iconoEditar);
            botonEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            botonEditar.classList.add('boton', 'boton-editar');

            //agregarlo al padre
            contenedorAcciones.appendChild(botonEditar);

            //crear icono borrar
            const iconoBorrar = document.createElement('i');
            iconoBorrar.classList.add('fas', 'fa-trash-alt');

            //crear el boton eliminar
            const botonBorrar = document.createElement('button');
            botonBorrar.appendChild(iconoBorrar);
            botonBorrar.setAttribute('data-id', respuesta.datos.id_insertado);
            botonBorrar.classList.add('boton', 'boton-borrar');

            //agregarlo al padre
            contenedorAcciones.appendChild(botonBorrar);

            //agregarlo al <tr></tr>
            nuevoContacto.appendChild(contenedorAcciones);

            //agregarlo a la lista contactos
            listadoContactos.appendChild(nuevoContacto);

            //resetear el form
            document.querySelector('form').reset();

            //mostrar notificación
            mostrarNotificacion('¡Contacto creado con éxito!', 'exito');

            //actualizar numero de contactos    
            contadorContactos();
        }
    }

    //enviar datos
    xhr.send(datos);
}


function actualizarRegistro(datos) {
    //crear objeto
    const xhr = new XMLHttpRequest();
    //abrir conexion
    xhr.open('POST', 'inc/modelos/modelo-contacto.php', true);
    //leer respuesta
    xhr.onload = function() {
            if (this.status === 200) {
                const respuesta = JSON.parse(xhr.responseText);
                if (respuesta.respuesta === 'correcto') {
                    //mostrar notificacion
                    mostrarNotificacion('Contacto editado correctamente', 'exito');
                    //redireccionar
                    setTimeout(() => {
                        window.location.href = 'index.php'
                    }, 2000);
                } else {
                    //hubo un error
                    mostrarNotificacion('No se realizaron cambios', 'error')
                }


            }
        }
        //enviar petición
    xhr.send(datos);
}


//eliminar contactos
function eliminarContacto(e) {
    if (e.target.parentElement.classList.contains('boton-borrar')) {
        //tomar el id
        const id = e.target.parentElement.getAttribute('data-id');

        //confirmacion
        const respuesta = confirm('¿Estas segurx?')

        if (respuesta) {
            //llamado a ajax
            //crear el objeto
            const xhr = new XMLHttpRequest();

            //abrir la conexion
            xhr.open('GET', `inc/modelos/modelo-contacto.php?id=${id}&accion=borrar`, true);

            //leer respuesta
            xhr.onload = function() {
                    if (this.status === 200) {
                        const resultado = JSON.parse(xhr.responseText);
                        if (resultado.respuesta == 'correcto') {
                            //eliminar el registro del DOM
                            e.target.parentElement.parentElement.parentElement.remove();

                            //mostrar notificacion
                            mostrarNotificacion('contacto eliminado', 'exito');


                            //actualizar numero de contactos
                            contadorContactos();
                        } else {
                            //mostramos notificacion
                            mostrarNotificacion('Hubo un error', 'error');
                        }
                    }
                }
                //enviar peticion
            xhr.send();
        }
    }
}


//notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //formulario
    formContactos.insertBefore(notificacion, document.querySelector('form legend'));


    //ocultar y mostrar la notificación
    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');

            setTimeout(() => {
                notificacion.remove();
            }, 500);
        }, 3000);
    }, 100);
}


//buscador de contactos
function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i"), //"i" funciona como 'case insensitive'
        registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro => {
        registro.style.display = 'none';

        //la expresion .replace(/\s/g, "") busca los espacios de una RegExp y los reemplaza con un espacio. 
        if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1) {
            registro.style.display = 'table-row';
        }

        //actualizar numero de contactos
        contadorContactos();
    });
}


//contador contactos
function contadorContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
        contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;
    totalContactos.forEach(contacto => {
        if (contacto.style.display === '' || contacto.style.display === 'table-row') {
            total++;
        };
    })

    // console.log(total);

    contenedorNumero.textContent = total;
}