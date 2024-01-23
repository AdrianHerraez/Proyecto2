<?php
include_once("../conexion.php");

if (!empty($_POST["id_mesa"])) {
    $id_mesa = $_POST["id_mesa"];

    $sql = 'SELECT COUNT(*) as num_sillas FROM tbl_sillas INNER JOIN tbl_mesas ON id_mesa_silla = :id_mesa GROUP BY id_mesa';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id_mesa', $id_mesa);
    $stmt->execute();
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
    $num_sillas = $resultado["num_sillas"];

    $num_sillas += 1;

    if ($num_sillas) {

        $sql2 = 'INSERT INTO tbl_sillas (id_mesa_silla, numero_silla) VALUES (:id_mesa, :num_sillas)';
        $stmt2 = $pdo->prepare($sql2);
        $stmt2->bindParam(':id_mesa', $id_mesa);
        $stmt2->bindParam(':num_sillas', $num_sillas);
        $stmt2->execute();
    }    
}