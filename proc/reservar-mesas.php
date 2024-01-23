<?php
session_start();
$usuario = $_SESSION['user'];
include_once("../conexion.php");

if (!empty($_POST["id_mesa"]) && !empty($_POST["hora_inicio"]) && !empty($_POST["hora_fin"])) {
    $id_mesa = $_POST["id_mesa"];
    $hora_inicio = $_POST["hora_inicio"];
    $hora_fin = $_POST["hora_fin"];

    // Agregar la fecha actual al formato de hora
    $fecha_actual = date('Y-m-d');
    $hora_inicio = date('Y-m-d H:i:s', strtotime("$fecha_actual $hora_inicio"));
    $hora_fin = date('Y-m-d H:i:s', strtotime("$fecha_actual $hora_fin"));

    $sql = "INSERT INTO tbl_ocupacion (hora_inicio_ocupacion, hora_final_ocupacion, id_personal_ocupacion, id_mesa_ocupacion) VALUES (:hora_inicio, :hora_fin, :usuario, :id_mesa)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':hora_inicio', $hora_inicio);
    $stmt->bindParam(':hora_fin', $hora_fin);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':id_mesa', $id_mesa);

    $resultado = $stmt->execute();
}
?>
