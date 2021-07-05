<?php 

function obtenerContactos(){
    include 'bd.php';
    try {
        return $conn->query("SELECT id, nombre, telefono, email from contactos");
    } catch (Exception $e) {
        echo "¡Error!" . $e->getMessage() . "<br>";
        return false;
    }
}

//OBTENER CONTACTO POR ID
function obtenerContacto($id){
    include 'bd.php';
    try {
        return $conn->query("SELECT id, nombre, telefono, email from contactos WHERE id = $id");
    } catch (Exception $e) {
        echo "¡Error!" . $e->getMessage() . "<br>";
        return false;
    }
}



?>