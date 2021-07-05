if (e.target.parentElement.classList.contains('boton-borrar')) {
    //tomar el id
    const id = e.target.parentElement.getAttribute('data-id');

    //confirmacion del usuario
    const respuesta = confirm('¿Estas segurx?');
    // console.log(respuesta);

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
                    console.log(resultado);
                }
            }
            //enviar peticion
    } else {
        console.log('ahora debo pensarlo');
    }
}















//modelo-contato

require_once('../funciones/bd.php');

$id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

try {
    $stmt = $conn - > prepare("DELETE FROM contactos WHERE id = ? "); //cuando DELETE, si no WHERE pierdes todos los registros 
    $stmt - > bind_param("i", $id);
    $stmt - > execute();

    if ($stmt - > affected_rows == 1) {
        $respuesta = array(
            'respuesta' => 'correcto'
        );
    }

    $stmt - > close();
    $conn - > close();
} catch (Exception $e) {
    $respuesta = array(
        'error' => $e - > getMessage()
    );
}
echo json_encode($respuesta);