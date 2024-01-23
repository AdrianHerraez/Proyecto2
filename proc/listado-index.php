<?php
include_once("../conexion.php");

if (!empty($_POST["tipo_sala"])) {
    $tipo_sala = $_POST["tipo_sala"];
} else {
    $tipo_sala = "%";
}

if (!empty($_POST["ocupacion_mesa"])) {
    $ocupacion_mesa = $_POST["ocupacion_mesa"];
} else {
    $ocupacion_mesa = "%";
}

if ($tipo_sala && $ocupacion_mesa) {
    $sql = 'SELECT * FROM tbl_mesas INNER JOIN tbl_salas ON id_sala_mesa = id_sala WHERE tipo_sala LIKE :tipo_sala AND ocupacion_mesa LIKE :ocupacion_mesa';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':tipo_sala', $tipo_sala);
    $stmt->bindParam(':ocupacion_mesa', $ocupacion_mesa);
    $stmt->execute();
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $resultadoFinal = array();

    foreach ($resultado as $mesa) {
        $id_mesa = $mesa['id_mesa'];

        $sql2 = 'SELECT 
        COUNT(DISTINCT id_silla) as num_sillas, 
        SUM(CASE WHEN estado_silla = "Funcional" THEN 1 ELSE 0 END) as num_sillas_funcionales, 
        SUM(CASE WHEN estado_silla = "Rota" THEN 1 ELSE 0 END) as num_sillas_rotas 
        FROM tbl_sillas 
        RIGHT JOIN tbl_mesas ON id_mesa_silla = :id_mesa 
        GROUP BY id_mesa';

        $stmt2 = $pdo->prepare($sql2);
        $stmt2->bindParam(':id_mesa', $id_mesa);
        $stmt2->execute();
        $resultado2 = $stmt2->fetch(PDO::FETCH_ASSOC);

        $num_sillas_funcionales = $resultado2["num_sillas_funcionales"];
        $num_sillas_rotas = $resultado2["num_sillas_rotas"];

        $info_mesa = array(
            'mesa' => $mesa,
            'num_sillas_funcionales' => $num_sillas_funcionales,
            'num_sillas_rotas' => $num_sillas_rotas
        );

        $resultadoFinal[] = $info_mesa;
    }
    
    echo json_encode($resultadoFinal);
}