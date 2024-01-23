<?php 
    include_once("./proc/verificar-sesion.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oasis23</title>
    <link rel="stylesheet" type="text/css" href="./css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
    <?php
        include_once("header.php");
    ?>

    <div id="historial-filtro">

    </div>

    <div class="div-table">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Mesa</th>
                    <th>Camarero</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Final</th>
                    <th>Reserva</th>
                </tr>
            </thead>
            <tbody id="historial-listado">

            </tbody>
        </table>
    </div>
    <script src="js/script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
</body>
</html>