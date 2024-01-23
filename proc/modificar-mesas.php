<?php
include_once("../conexion.php");

if (!empty($_POST["id_mesa"]) && !empty($_POST["accion"])) {
    $id_mesa = $_POST["id_mesa"];
    $accion = $_POST["accion"];

    if ($accion === "funcional") {
        $sql = 'UPDATE tbl_mesas SET estado_mesa = "Funcional" WHERE id_mesa = :id_mesa';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_mesa', $id_mesa);
        $stmt->execute();
    } else {
        $sql = 'UPDATE tbl_mesas SET estado_mesa = "Rota" WHERE id_mesa = :id_mesa';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id_mesa', $id_mesa);
        $stmt->execute();
    }
}