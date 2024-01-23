<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="./css/header.css">
    <script src="./js/script.js"></script>
</head>
<body>
    <div class="navbar">
        <div class="logo">
            <a href="./index.php">
                <img src="img/logo_oasis23.png" alt="">
            </a>
        </div>
        <div class="enlaces">
            <?php
            if ($permiso == "Admin") {
                echo('<a href="./personal.php"><p>Personal</p></a>');
            }
            ?>
            <a href="./historial.php"><p>Historial</p></a>
            <a onclick="confirmarCerrarSesion()" href="#"><p>Cerrar Sesion</p></a>
        </div>
    </div>
</body>
</html>