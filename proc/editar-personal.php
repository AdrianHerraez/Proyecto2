<?php
include_once("../conexion.php");

if (!empty($_POST["id_personal"]) && !empty($_POST["nuevo_username_personal"]) && !empty($_POST["nuevo_nombre_personal"]) && !empty($_POST["nuevo_apellidos_personal"])) {
    $id_personal = $_POST["id_personal"];
    $username_personal = $_POST["nuevo_username_personal"];
    $nombre_personal = $_POST["nuevo_nombre_personal"];
    $apellidos_personal = $_POST["nuevo_apellidos_personal"];
    
    $sql = 'UPDATE tbl_personal SET username_personal = :username_personal, nombre_personal = :nombre_personal, apellidos_personal = :apellidos_personal WHERE id_personal = :id_personal';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username_personal', $username_personal);
    $stmt->bindParam(':nombre_personal', $nombre_personal);
    $stmt->bindParam(':apellidos_personal', $apellidos_personal);
    $stmt->bindParam(':id_personal', $id_personal);
    $stmt->execute();
}