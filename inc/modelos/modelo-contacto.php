<?php


if ($_POST['accion'] == 'crear') {
    //crea un nuevo registro en la BD


    //abre la conexión a la bd
    require_once('../funciones/bd.php');

    //validar entradas para evitar injecciones maliciosas
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);

    try {
        $stmt = $conn->prepare("INSERT INTO contactos (nombre, telefono, email) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $telefono, $email);
        $stmt->execute();
        if ($stmt->affected_rows == 1) {
            $respuesta = array(
                'respuesta' => 'correcto',
                'datos' => array(
                    'nombre' => $nombre,
                    'telefono' => $telefono,    
                    'email' => $email,
                    'id_insertado' => $stmt->insert_id
                )
            );
        }

        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }   

    echo json_encode($respuesta);
}

if ($_GET['accion'] == 'borrar') {
    
    require_once('../funciones/bd.php');

    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);


    try {
        $stmt = $conn->prepare("DELETE FROM contactos WHERE id = ? "); //si DELETE o UPDATE, siempre WHERE para no perder todos los registros 
        $stmt->bind_param("i", $id);
        $stmt->execute();
    
        if ($stmt->affected_rows == 1) {
            $respuesta = array(
                'respuesta' => 'correcto'
            );
        }
    
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);
}

if ($_POST['accion'] == 'editar') {
    // echo json_encode($_POST);
    require_once('../funciones/bd.php');
    //validar entradas para evitar injecciones maliciosas
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_STRING);
    $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);

    try {
        $stmt = $conn->prepare("UPDATE contactos SET nombre = ?, telefono = ?, email = ? WHERE id = ?");
        $stmt->bind_param("sssi", $nombre, $telefono, $email, $id);
        $stmt->execute();
        if ($stmt->affected_rows == 1) {
            $respuesta = array(
                'respuesta' => 'correcto'
            );
        } else {
            $respuesta = array(
                'respuesta' => 'error'
            );
        }
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        $respuesta = array(
            'error' => $e->getMessage()
        );
    }

    echo json_encode($respuesta);

    }

