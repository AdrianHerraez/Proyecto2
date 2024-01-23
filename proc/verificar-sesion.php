<?php 
    session_start();

    if (!isset($_SESSION["user"]) || !isset($_SESSION["username"])) {
        header("location: ./login.php");
    }
    $usuario = $_SESSION['user'];
    $username = $_SESSION['username'];
    $permiso = $_SESSION['tipo_personal'];