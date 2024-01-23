<?php
include_once("../conexion.php");

if (!empty($_POST["username_personal"])) {
    $username_personal = $_POST["username_personal"];
} else {
    $username_personal = "%";
}

if (!empty($_POST["id_personal"]) && $_POST["id_personal"] != NULL) {
    $id_personal = $_POST["id_personal"];
} else {
    $id_personal = "%";
}

if (!empty($_POST["tipo_personal"])) {
    $tipo_personal = $_POST["tipo_personal"];
} else {
    $tipo_personal = "%";
}

if ($username_personal) {
    $sql = 'SELECT * FROM tbl_personal WHERE (username_personal LIKE :username_personal OR nombre_personal LIKE :username_personal) AND id_personal LIKE :id_personal AND tipo_personal LIKE :tipo_personal'; // Hacer que sea %:username_personal%
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username_personal', $username_personal);
    $stmt->bindParam(':id_personal', $id_personal);
    $stmt->bindParam(':tipo_personal', $tipo_personal);
    $stmt->execute();
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($resultado);
}