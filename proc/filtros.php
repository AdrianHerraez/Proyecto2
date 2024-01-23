<?php
include_once("../conexion.php");

$sql = 'SELECT DISTINCT tipo_sala FROM tbl_salas';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);