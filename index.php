<?php

    include 'inc/funciones/funciones.php';
    include 'inc/layouts/header.php'; 

?>


<div class="barra">
<h1>Agenda de Contactos</h1>
</div>

<div class="agregar-contacto contenedor sombra">
    <form action="#" id="form-contacto">
        <legend>Añada un campo <br> <span>Todos los campos son obligatorios</span> </legend>
        

        <?php include 'inc/layouts/form.php' ?>


        
    </form>
</div>

<div class="contenedor contactos sombra">
    <div class="lista-contactos">
        <h2>Contactos</h2>
        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar contacto...">
        <p class="total-contactos"><span>2</span> Contactos</p>


        <div class="contenedor-tabla">
            <table id="tabla-contactos" class="tabla-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php $contactos = obtenerContactos(); 
                    if ($contactos->num_rows) { 
                        foreach ($contactos as $contacto) { ?>
                            <tr>
                                <td><?php echo $contacto['nombre']; ?></td>
                                <td><?php echo $contacto['telefono']; ?></td>
                                <td><?php echo $contacto['email']; ?></td>
                                <td>
                                    <a class="boton boton-editar" href="editar.php?id=<?php echo $contacto['id']; ?>">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <button data-id="<?php echo $contacto['id']; ?>" type="button" class="boton boton-borrar">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>


                        <?php } 
                    } ?>
                    
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include 'inc/layouts/footer.php'; ?>