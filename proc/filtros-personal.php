<?php
include_once("../conexion.php");

$sql = 'SELECT DISTINCT tipo_personal FROM tbl_personal';
$stmt = $pdo->prepare($sql);
$stmt->execute();
$resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($resultado);