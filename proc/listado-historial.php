<?php
include_once("../conexion.php");

if (!empty($_POST["id_mesa"])) {
    $id_mesa = $_POST["id_mesa"];
} else {
    $id_mesa = "%";
}

if ($id_mesa) {
    $sql = 'SELECT * FROM tbl_ocupacion INNER JOIN tbl_personal ON id_personal = id_personal_ocupacion INNER JOIN tbl_mesas ON id_mesa = id_mesa_ocupacion
    WHERE id_mesa_ocupacion LIKE :id_mesa';

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id_mesa', $id_mesa);
    $stmt->execute();
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($resultado);
}