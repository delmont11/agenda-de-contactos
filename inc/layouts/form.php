<div class="campos">
            <div class="campo">
                <label for="nombre">Nombre:</label>
                <input 
                type="text" 
                id="nombre" 
                placeholder="Nombre Contacto" 
                id="nombre"
                value="<?php echo ($contacto['nombre']) ? $contacto['nombre'] : ''; ?>">
            </div>
            <div class="campo">
                <label for="telefono">Teléfono:</label>
                <input 
                type="tel" 
                id="telefono" 
                placeholder="Número teléfono" 
                id="telefono"
                value="<?php echo ($contacto['telefono']) ? $contacto['telefono'] : ''; ?>">
            </div>
            <div class="campo">
                <label for="empresa">Email</label>
                <input 
                type="email" 
                id="email" 
                placeholder="Nombre Empresa" 
                id="empresa"
                value="<?php echo ($contacto['email']) ? $contacto['email'] : ''; ?>">
            </div>
            
<div class="enviar">
    <?php 

        $textoBoton = ($contacto['telefono']) ? 'Guardar' : 'Añadir';

        $accion = ($contacto['telefono']) ? 'editar' : 'crear';
    ?>

    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php if(isset($contacto['id'])) {?>

        <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">
    <?php } ?>

    <input type="submit" value="<?php echo $textoBoton ?>">
</div>