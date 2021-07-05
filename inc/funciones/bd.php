<?php 

//credenciales de la BD
define('BD_USUARIO', 'root');
define('BD_PASSWORD', 'root');
define('BD_HOST', 'localhost');
define('BD_NOMBRE', 'agendaphp');


$conn = new mysqli(BD_HOST, BD_USUARIO, BD_PASSWORD, BD_NOMBRE);


//ping sirve para comprobar la conexión a la base de datos, arroja un 1 en el navegador
// echo $conn->ping();
?>