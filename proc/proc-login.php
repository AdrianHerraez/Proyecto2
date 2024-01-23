<?php
session_start();
include '../conexion.php';

if (!isset($_POST['login'])) {
    header('Location: ../login.php');
} else {

    $user = $_POST['user'];
    $pwd = $_POST['pwd'];

    // Consulta SQL para seleccionar el nombre de usuario y la contraseña hash de la base de datos
    $sql = "SELECT id_personal, username_personal, pwd_personal, tipo_personal FROM tbl_personal WHERE username_personal = :username_personal";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username_personal', $user);
    $stmt->execute();
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($resultado) == 1) {
        $row = $resultado[0];
        $pwd2_encript = $row['pwd_personal'];

        // Verificar la contraseña utilizando password_verify
        if (password_verify($pwd, $pwd2_encript)) {
            // Iniciar sesión y redirigir al usuario
            $_SESSION['user'] = $row['id_personal'];
            $_SESSION['username'] = $row['username_personal'];
            $_SESSION['tipo_personal'] = $row['tipo_personal'];
            header('Location: ../index.php');
        } else {
            // Contraseña incorrecta, redirigir al formulario de inicio de sesión con un mensaje de error
            header('Location: ../login.php?fallo=0');
        }
    } else {
        // Usuario no encontrado, redirigir al formulario de inicio de sesión con un mensaje de error
        header('Location: ../login.php?fallo=1');
    }
}