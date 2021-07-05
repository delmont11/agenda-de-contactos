<?php 

    include 'inc/funciones/funciones.php';
    include 'inc/layouts/header.php'; 

    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);
    if (!$id) {
        die('No es válido');
    }

    $resultado = obtenerContacto($id);
    $contacto = $resultado->fetch_assoc();
?>


<div class="barra">
    <div class="contenedor barra-editar">
        <a href="index.php" class="boton boton-volver"><i class="fas fa-chevron-circle-left"></i></a>
            <h1>Editar Contacto</h1>
        <div class="guardado">
            <i class="fas fa-check-circle guardado"></i>
        </div> 
    </div>
</div>

<div class="contenedor contenedor-editar sombra">
    <form  action="#" id="form-contacto">
        <legend>Edite el contacto</legend>
        <?php include 'inc/layouts/form.php' ?> 
    </form>
</div>



<?php include 'inc/layouts/footer.php'; ?>