<?php
include_once("../conexion.php");

if (!empty($_POST["id_mesa"])) {
    $id_mesa = $_POST["id_mesa"];

    $sql = 'SELECT * FROM tbl_sillas INNER JOIN tbl_mesas ON id_mesa_silla = :id_mesa WHERE estado_silla = "Rota" LIMIT 1';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id_mesa', $id_mesa);
    $stmt->execute();
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($resultado) {
        $id_silla = $resultado["id_silla"];

        $sql2 = 'UPDATE tbl_sillas SET estado_silla = "Funcional" WHERE id_silla = :id_silla';
        $stmt2 = $pdo->prepare($sql2);
        $stmt2->bindParam(':id_silla', $id_silla);
        $stmt2->execute();
    }    
}