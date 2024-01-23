<?php

include_once("verificar-sesion.php");
include_once("../conexion.php");

if (!empty($_POST["id_mesa"]) && !empty($_POST["accion"])) {
    $id_mesa = $_POST["id_mesa"];
    $accion = $_POST["accion"];

    try {
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->beginTransaction();

        if ($accion == "ocupar") {
            $sql = 'UPDATE tbl_mesas SET ocupacion_mesa = "Ocupada" WHERE id_mesa = :id_mesa;';
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":id_mesa", $id_mesa);
            $stmt->execute();

            $horaInicio = date('Y-m-d\TH:i:s');

            $sql2 = 'INSERT INTO tbl_ocupacion (hora_inicio_ocupacion, hora_final_ocupacion, id_personal_ocupacion, id_mesa_ocupacion) VALUES (:horaInicio, NULL, :usuario, :id_mesa);';
            $stmt2 = $pdo->prepare($sql2);
            $stmt2->bindParam(":horaInicio", $horaInicio);
            $stmt2->bindParam(":usuario", $usuario);
            $stmt2->bindParam(":id_mesa", $id_mesa);
            $stmt2->execute();

        } else {
            $sql = 'UPDATE tbl_mesas SET ocupacion_mesa = "Libre" WHERE id_mesa = :id_mesa;';
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(":id_mesa", $id_mesa);
            $stmt->execute();

            $horaFinal = date('Y-m-d\TH:i:s');

            $sql2 = 'UPDATE tbl_ocupacion INNER JOIN tbl_mesas ON id_mesa = id_mesa_ocupacion SET hora_final_ocupacion = :horaFinal WHERE id_mesa_ocupacion = :id_mesa AND ocupacion_mesa = "Libre";';
            $stmt2 = $pdo->prepare($sql2);
            $stmt2->bindParam(":horaFinal", $horaFinal);
            $stmt2->bindParam(":id_mesa", $id_mesa);
            $stmt2->execute();
        }

        $pdo->commit();

        // echo $id_mesa . ' ' . $accion . ' ' . $usuario;

    } catch (PDOException $e) {
        $pdo->rollBack();
        echo $e->getMessage();
        die();
    }
}