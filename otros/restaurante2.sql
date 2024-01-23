-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-01-2024 a las 15:39:56
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

CREATE DATABASE restaurante2;
USE restaurante2;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurante2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_personal`
--

CREATE TABLE `tbl_personal` (
  `id_personal` int(11) NOT NULL,
  `username_personal` varchar(20) NOT NULL,
  `nombre_personal` varchar(45) NOT NULL,
  `apellidos_personal` varchar(60) NOT NULL,
  `pwd_personal` varchar(80) NOT NULL,
  `tipo_personal` enum('Admin','Camarero','Mantenimiento') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_personal`
--

INSERT INTO `tbl_personal` (`id_personal`, `username_personal`, `nombre_personal`, `apellidos_personal`, `pwd_personal`, `tipo_personal`) VALUES
(1, 'ivaanmoreeno', 'Ivan', 'Moreno', '$2y$10$wigWyJ26umFhiMWROr/DK.NqNltLAI4M2dRT5l4MyPPkoy4YN5rW6', 'Admin'),
(2, 'adricamarero', 'Adrian', 'Herraez', '$2y$10$wigWyJ26umFhiMWROr/DK.NqNltLAI4M2dRT5l4MyPPkoy4YN5rW6', 'Admin'),
(3, 'camarero3', 'Sergio', 'Leon', '$2y$10$wigWyJ26umFhiMWROr/DK.NqNltLAI4M2dRT5l4MyPPkoy4YN5rW6', 'Camarero'),
(4, 'camarero4', 'Laura', 'Rodriguez', '$2y$10$wigWyJ26umFhiMWROr/DK.NqNltLAI4M2dRT5l4MyPPkoy4YN5rW6', 'Camarero'),
(5, 'aaa', 'aaa', 'aaa', '$2y$10$wigWyJ26umFhiMWROr/DK.NqNltLAI4M2dRT5l4MyPPkoy4YN5rW6', 'Camarero'),
(6, 'adricamarero2', 'asa', 'aaa', '$2y$10$wigWyJ26umFhiMWROr/DK.NqNltLAI4M2dRT5l4MyPPkoy4YN5rW6', 'Camarero'),
(7, 'ivanmoreno2', 'asa', 'aaa', '$2y$10$wigWyJ26umFhiMWROr/DK.NqNltLAI4M2dRT5l4MyPPkoy4YN5rW6', 'Camarero'),
(8, 'ivanmoreeno3', 'asa', 'aaa', '$2y$10$wigWyJ26umFhiMWROr/DK.NqNltLAI4M2dRT5l4MyPPkoy4YN5rW6', 'Mantenimiento'),
(9, 'hola', 'aaa', 'aaa', '$2y$10$wigWyJ26umFhiMWROr/DK.NqNltLAI4M2dRT5l4MyPPkoy4YN5rW6', 'Mantenimiento'),
(10, 'camarero32', 'aaa', 'aaa', '$2y$10$wigWyJ26umFhiMWROr/DK.NqNltLAI4M2dRT5l4MyPPkoy4YN5rW6', 'Mantenimiento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_mesas`
--

CREATE TABLE `tbl_mesas` (
  `id_mesa` int(11) NOT NULL,
  `nombre_mesa` varchar(4) NOT NULL,
  `ocupacion_mesa` enum('Libre','Ocupada') NOT NULL,
  `estado_mesa` enum('Funcional','Rota') NOT NULL,
  `id_sala_mesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_mesas`
--

INSERT INTO `tbl_mesas` (`id_mesa`, `nombre_mesa`,`ocupacion_mesa`, `estado_mesa`, `id_sala_mesa`) VALUES
(1, 'T1M1', 'Libre', 'Funcional', 1),
(2, 'T1M2', 'Libre', 'Funcional', 1),
(3, 'T1M3', 'Libre', 'Funcional', 1),
(4, 'T1M4', 'Libre', 'Funcional', 1),
(5, 'T2M1', 'Libre', 'Funcional', 2),
(6, 'T2M2', 'Libre', 'Funcional', 2),
(7, 'T2M3', 'Libre', 'Funcional', 2),
(8, 'T3M1', 'Libre', 'Funcional', 3),
(9, 'T3M2', 'Libre', 'Funcional', 3),
(10, 'T3M3', 'Libre', 'Funcional', 3),
(11, 'C1M1', 'Libre', 'Funcional', 4),
(12, 'C1M2', 'Libre', 'Funcional', 4),
(13, 'C1M3', 'Libre', 'Funcional', 4),
(14, 'C2M1', 'Libre', 'Funcional', 5),
(15, 'C2M2', 'Libre', 'Funcional', 5),
(16, 'C2M3', 'Libre', 'Funcional', 5),
(17, 'P1M1', 'Libre', 'Funcional', 6),
(18, 'P2M1', 'Libre', 'Funcional', 7),
(19, 'P3M1', 'Libre', 'Funcional', 8),
(20, 'P4M1', 'Libre', 'Funcional', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_ocupacion`
--

CREATE TABLE `tbl_ocupacion` (
  `id_ocupacion` int(11) NOT NULL,
  `nombre_ocupacion` varchar(20) DEFAULT NULL,
  `hora_inicio_ocupacion` datetime NOT NULL,
  `hora_final_ocupacion` datetime DEFAULT NULL,
  `id_personal_ocupacion` int(11) NOT NULL,
  `id_mesa_ocupacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_ocupacion`
--

INSERT INTO `tbl_ocupacion` (`id_ocupacion`, `nombre_ocupacion`, `hora_inicio_ocupacion`, `hora_final_ocupacion`, `id_personal_ocupacion`, `id_mesa_ocupacion`) VALUES
(1, 'Pepe', '2023-11-23 19:33:43', '2023-11-29 19:40:43', 2, 1),
(2, 'Pepe', '2023-11-26 21:21:27', '2023-11-29 19:40:43', 2, 1),
(3, 'Pepe', '2023-11-26 21:38:02', '2023-11-29 19:40:43', 2, 1),
(4, 'Pepe', '2023-11-26 21:38:51', '2023-11-29 19:40:43', 2, 1),
(5, 'Pepe', '2023-11-26 23:57:57', '2023-11-29 19:40:43', 2, 10),
(6, 'Pepe', '2023-11-27 15:13:09', '2023-11-29 19:40:43', 2, 3),
(7, 'Pepe', '2023-11-27 15:13:13', '2023-11-29 19:40:43', 2, 2),
(8, 'Pepe', '2023-11-29 17:03:38', '2023-11-29 19:40:43', 2, 1),
(9, 'Pepe', '2023-11-29 19:02:21', '2023-11-29 19:40:43', 2, 3),
(10, 'Pepe', '2023-11-29 19:02:21', '2023-11-29 19:40:43', 2, 10),
(11, 'Pepe', '2023-11-29 19:07:22', '2023-11-29 19:07:30', 2, 11),
(12, 'Pepe', '2023-11-29 19:07:22', '2023-11-29 19:07:30', 2, 12),
(13, 'Pepe', '2023-11-29 19:07:22', '2023-11-29 19:07:30', 2, 13),
(14, 'Pepe', '2023-11-29 19:07:22', '2023-11-29 19:07:30', 2, 14),
(15, 'Pepe', '2023-11-29 19:07:22', '2023-11-29 19:07:30', 2, 15),
(16, 'Pepe', '2023-11-29 19:07:22', '2023-11-29 19:07:30', 2, 16),
(17, 'Pepe', '2023-11-29 19:40:20', '2023-11-29 19:40:43', 2, 1),
(18, 'Pepe', '2023-11-29 19:40:20', '2023-11-29 19:40:43', 2, 2),
(19, 'Pepe', '2023-11-29 19:40:20', '2023-11-29 19:40:43', 2, 3),
(20, 'Pepe', '2023-11-29 19:40:20', '2023-11-29 19:40:43', 2, 4),
(21, 'Pepe', '2023-11-29 19:40:20', '2023-11-29 19:40:43', 2, 5),
(22, 'Pepe', '2023-11-29 19:40:20', '2023-11-29 19:40:43', 2, 6),
(23, 'Pepe', '2023-11-29 19:40:20', '2023-11-29 19:40:43', 2, 7),
(24, 'Pepe', '2023-11-29 19:40:20', '2023-11-29 19:40:43', 2, 8),
(25, 'Pepe', '2023-11-29 19:40:20', '2023-11-29 19:40:43', 2, 9),
(26, 'Pepe', '2023-11-29 19:40:20', '2023-11-29 19:40:43', 2, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_salas`
--

CREATE TABLE `tbl_salas` (
  `id_sala` int(11) NOT NULL,
  `nombre_sala` varchar(15) NOT NULL,
  `tipo_sala` enum('Terraza','Comedor','Sala Privada') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_salas`
--

INSERT INTO `tbl_salas` (`id_sala`, `nombre_sala`, `tipo_sala`) VALUES
(1, 'Terraza1', 'Terraza'),
(2, 'Terraza2', 'Terraza'),
(3, 'Terraza3', 'Terraza'),
(4, 'Comedor1', 'Comedor'),
(5, 'Comedor2', 'Comedor'),
(6, 'SalaPrivada1', 'Sala Privada'),
(7, 'SalaPrivada2', 'Sala Privada'),
(8, 'SalaPrivada3', 'Sala Privada'),
(9, 'SalaPrivada4', 'Sala Privada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_sillas`
--

CREATE TABLE `tbl_sillas` (
  `id_silla` int(11) NOT NULL,
  `numero_silla` varchar(2) NOT NULL,
  `estado_silla` enum('Funcional','Rota') NOT NULL,
  `id_mesa_silla` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tbl_sillas`
--

INSERT INTO `tbl_sillas` (`id_silla`, `numero_silla`, `estado_silla`, `id_mesa_silla`) VALUES
(1, '1', 'Funcional', 1),
(2, '2', 'Funcional', 1),
(3, '1', 'Funcional', 2),
(4, '2', 'Funcional', 2),
(5, '3', 'Funcional', 2),
(6, '4', 'Funcional', 2),
(7, '1', 'Funcional', 3),
(8, '2', 'Funcional', 3),
(9, '3', 'Funcional', 3),
(10, '4', 'Funcional', 3),
(11, '5', 'Funcional', 3),
(12, '6', 'Funcional', 3),
(13, '1', 'Funcional', 4),
(14, '2', 'Funcional', 4),
(15, '3', 'Funcional', 4),
(16, '3', 'Funcional', 4),
(17, '4', 'Funcional', 5),
(18, '5', 'Funcional', 5),
(19, '6', 'Funcional', 5),
(20, '7', 'Funcional', 5),
(21, '8', 'Funcional', 5),
(22, '8', 'Funcional', 5),
(23, '1', 'Funcional', 6),
(24, '2', 'Funcional', 6),
(25, '3', 'Funcional', 6),
(26, '4', 'Funcional', 6),
(27, '1', 'Funcional', 7),
(28, '2', 'Funcional', 7),
(29, '3', 'Funcional', 7),
(30, '4', 'Funcional', 7),
(31, '1', 'Funcional', 8),
(32, '2', 'Funcional', 8),
(33, '1', 'Funcional', 9),
(34, '2', 'Funcional', 9),
(35, '3', 'Funcional', 9),
(36, '4', 'Funcional', 9),
(37, '5', 'Funcional', 9),
(38, '6', 'Funcional', 9),
(39, '1', 'Funcional', 10),
(40, '2', 'Funcional', 10),
(41, '3', 'Funcional', 10),
(42, '4', 'Funcional', 10),
(43, '5', 'Funcional', 10),
(44, '6', 'Funcional', 10),
(45, '1', 'Funcional', 11),
(46, '2', 'Funcional', 11),
(47, '1', 'Funcional', 12),
(48, '2', 'Funcional', 12),
(49, '1', 'Funcional', 13),
(50, '2', 'Funcional', 13),
(51, '3', 'Funcional', 13),
(52, '4', 'Funcional', 13),
(53, '1', 'Funcional', 14),
(54, '2', 'Funcional', 14),
(55, '3', 'Funcional', 14),
(56, '4', 'Funcional', 14),
(57, '1', 'Funcional', 15),
(58, '2', 'Funcional', 15),
(59, '3', 'Funcional', 15),
(60, '4', 'Funcional', 15),
(61, '5', 'Funcional', 15),
(62, '6', 'Funcional', 15),
(63, '1', 'Funcional', 16),
(64, '2', 'Funcional', 16),
(65, '3', 'Funcional', 16),
(66, '4', 'Funcional', 16),
(67, '5', 'Funcional', 16),
(68, '6', 'Funcional', 16),
(69, '1', 'Funcional', 17),
(70, '2', 'Funcional', 17),
(71, '3', 'Funcional', 17),
(72, '4', 'Funcional', 17),
(73, '5', 'Funcional', 17),
(74, '6', 'Funcional', 17),
(75, '7', 'Funcional', 17),
(76, '8', 'Funcional', 17),
(77, '9', 'Funcional', 17),
(78, '10', 'Funcional', 17),
(79, '11', 'Funcional', 17),
(80, '12', 'Funcional', 17),
(81, '1', 'Funcional', 18),
(82, '2', 'Funcional', 18),
(83, '3', 'Funcional', 18),
(84, '4', 'Funcional', 18),
(85, '5', 'Funcional', 18),
(86, '6', 'Funcional', 18),
(87, '1', 'Funcional', 19),
(88, '2', 'Funcional', 19),
(89, '3', 'Funcional', 19),
(90, '4', 'Funcional', 19),
(91, '5', 'Funcional', 19),
(92, '6', 'Funcional', 19),
(93, '1', 'Funcional', 20),
(94, '2', 'Funcional', 20),
(95, '3', 'Funcional', 20),
(96, '4', 'Funcional', 20),
(97, '5', 'Funcional', 20),
(98, '6', 'Funcional', 20),
(99, '7', 'Funcional', 20),
(100, '8', 'Funcional', 20);



-- Índices para tablas volcadas
ALTER TABLE `tbl_personal`
  ADD PRIMARY KEY (`id_personal`);

ALTER TABLE `tbl_mesas`
  ADD PRIMARY KEY (`id_mesa`),
  ADD KEY `mesas_salas_fk` (`id_sala_mesa`);

ALTER TABLE `tbl_ocupacion`
  ADD PRIMARY KEY (`id_ocupacion`),
  ADD KEY `ocupacion_camareros_fk` (`id_personal_ocupacion`),
  ADD KEY `ocupacion_mesas_fk` (`id_mesa_ocupacion`);

ALTER TABLE `tbl_salas`
  ADD PRIMARY KEY (`id_sala`);

ALTER TABLE `tbl_sillas`
  ADD PRIMARY KEY (`id_silla`),
  ADD KEY `sillas_mesas_fk` (`id_mesa_silla`);

-- AUTO_INCREMENT de las tablas volcadas

ALTER TABLE `tbl_personal`
  MODIFY `id_personal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

ALTER TABLE `tbl_mesas`
  MODIFY `id_mesa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

ALTER TABLE `tbl_ocupacion`
  MODIFY `id_ocupacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

ALTER TABLE `tbl_salas`
  MODIFY `id_sala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `tbl_sillas`
  MODIFY `id_silla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

-- Filtros para la tabla `tbl_mesas`
ALTER TABLE `tbl_mesas`
  ADD CONSTRAINT `mesas_salas_fk` FOREIGN KEY (`id_sala_mesa`) REFERENCES `tbl_salas` (`id_sala`);

-- Filtros para la tabla `tbl_ocupacion`
ALTER TABLE `tbl_ocupacion`
  ADD CONSTRAINT `ocupacion_camareros_fk` FOREIGN KEY (`id_personal_ocupacion`) REFERENCES `tbl_personal` (`id_personal`),
  ADD CONSTRAINT `ocupacion_mesas_fk` FOREIGN KEY (`id_mesa_ocupacion`) REFERENCES `tbl_mesas` (`id_mesa`);

-- Filtros para la tabla `tbl_sillas`
ALTER TABLE `tbl_sillas`
  ADD CONSTRAINT `sillas_mesas_fk` FOREIGN KEY (`id_mesa_silla`) REFERENCES `tbl_mesas` (`id_mesa`);

COMMIT;