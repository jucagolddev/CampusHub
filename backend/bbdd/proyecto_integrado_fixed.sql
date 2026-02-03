-- phpMyAdmin SQL Dump fixed for re-import
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Disable foreign key checks to allow dropping and creating tables in any order
SET FOREIGN_KEY_CHECKS = 0;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_integrado`
--
-- USE `proyecto_integrado`; -- Uncomment if you want to ensure it targets the right DB

-- --------------------------------------------------------
-- Limpieza de tablas existentes
-- --------------------------------------------------------
DROP TABLE IF EXISTS `usuario_proyecto`;
DROP TABLE IF EXISTS `rol_usuario`;
DROP TABLE IF EXISTS `proyecto_centro`;
DROP TABLE IF EXISTS `centro_titulo`;
DROP TABLE IF EXISTS `titulo_curso`;
DROP TABLE IF EXISTS `curso_modulo`;
DROP TABLE IF EXISTS `peticiones`;
DROP TABLE IF EXISTS `usuario`;
DROP TABLE IF EXISTS `proyecto`;
DROP TABLE IF EXISTS `rol`;
DROP TABLE IF EXISTS `modulo`;
DROP TABLE IF EXISTS `curso`;
DROP TABLE IF EXISTS `titulo`;
DROP TABLE IF EXISTS `centro_educativo`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro_educativo`
--
CREATE TABLE `centro_educativo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCentro` varchar(255) NOT NULL,
  `sufijoEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreCentro` (`nombreCentro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulo`
--
CREATE TABLE `titulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreTitulo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro_titulo`
--
CREATE TABLE `centro_titulo` (
  `centroId` int(11) NOT NULL,
  `tituloId` int(11) NOT NULL,
  PRIMARY KEY (`centroId`,`tituloId`),
  KEY `tituloId` (`tituloId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--
CREATE TABLE `curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numCurso` char(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulo`
--
CREATE TABLE `modulo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreModulo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreModulo` (`nombreModulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_modulo`
--
CREATE TABLE `curso_modulo` (
  `cursoId` int(11) NOT NULL,
  `moduloId` int(11) NOT NULL,
  PRIMARY KEY (`cursoId`,`moduloId`),
  KEY `moduloId` (`moduloId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `titulo_curso`
--
CREATE TABLE `titulo_curso` (
  `tituloId` int(11) NOT NULL,
  `cursoId` int(11) NOT NULL,
  PRIMARY KEY (`tituloId`,`cursoId`),
  KEY `cursoId` (`cursoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peticiones`
--
CREATE TABLE `peticiones` (
  `token` varchar(36) NOT NULL,
  `Rol` int(1) NOT NULL,
  PRIMARY KEY (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--
CREATE TABLE `proyecto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreProyecto` varchar(255) NOT NULL,
  `descripcionProyecto` varchar(255) NOT NULL,
  `urlProyecto` varchar(255) NOT NULL,
  `urlGitHub` varchar(255) NOT NULL,
  `imgPortada` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_centro`
--
CREATE TABLE `proyecto_centro` (
  `proyectoId` int(11) NOT NULL,
  `centroId` int(11) NOT NULL,
  PRIMARY KEY (`proyectoId`,`centroId`),
  KEY `centroId` (`centroId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombreGrupo` varchar(50) NOT NULL,
  `permisos` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombreGrupo` (`nombreGrupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--
INSERT INTO `rol` (`id`, `nombreGrupo`, `permisos`) VALUES
(1, 'Administrador', 'A'),
(2, 'Gestor', 'G'),
(3, 'Profesor', 'P'),
(4, 'Usuario', 'U');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--
CREATE TABLE `usuario` (
  `tokken` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `passwrd` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fecCreacion` datetime NOT NULL,
  PRIMARY KEY (`tokken`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--
INSERT INTO `usuario` (`tokken`, `userName`, `passwrd`, `email`, `fecCreacion`) VALUES
('09ff1fcf-d707-4684-97b7-166cba5cc491', 'PabloLeon', '$2b$10$zsL6uvU93UdK0sP5fbyKO.e4jLlwjvTaXf/QxG4eoN2i23TL0qQSm', 'pabloleon.24@campuscamara.es', '2026-02-03 02:04:55'),
('admin-uuid-super-secret', 'Super Admin', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOcd7qa8q.Rl2', 'admin@test.com', '2026-02-03 01:10:21'),
('d1c2ef17-a9f4-4451-93d5-d23ce8de482a', 'lucas', '$2b$10$GQ5juFjb8/nIF4vD0Lq0Zuxt2b9Bg5DNKBhGEZNZfAalSB3P/aZ/O', 'lucas.24@campuscamara.es', '2026-02-03 02:23:41'),
('juancarlos-admin-uuid', 'Juan Carlos', '$2b$10$hwmakfRX.NNDq6uATSmd5.ThLSK01QSkXrPmEb3dgWMFYJ0VEa5su', 'juancarlosdorado.24@campuscamara.es', '2026-02-03 01:52:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_usuario`
--
CREATE TABLE `rol_usuario` (
  `rolId` int(11) NOT NULL,
  `tokken` varchar(255) NOT NULL,
  PRIMARY KEY (`rolId`,`tokken`),
  KEY `tokken` (`tokken`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol_usuario`
--
INSERT INTO `rol_usuario` (`rolId`, `tokken`) VALUES
(1, 'admin-uuid-super-secret'),
(1, 'juancarlos-admin-uuid');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_proyecto`
--
CREATE TABLE `usuario_proyecto` (
  `tokken` varchar(255) NOT NULL,
  `proyectoId` int(11) NOT NULL,
  `creadorProyecto` tinyint(1) NOT NULL,
  PRIMARY KEY (`tokken`,`proyectoId`),
  KEY `proyectoId` (`proyectoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Restricciones para tablas volcadas (Relaciones)
--

ALTER TABLE `centro_titulo`
  ADD CONSTRAINT `centro_titulo_ibfk_1` FOREIGN KEY (`centroId`) REFERENCES `centro_educativo` (`id`),
  ADD CONSTRAINT `centro_titulo_ibfk_2` FOREIGN KEY (`tituloId`) REFERENCES `titulo` (`id`);

ALTER TABLE `curso_modulo`
  ADD CONSTRAINT `curso_modulo_ibfk_1` FOREIGN KEY (`cursoId`) REFERENCES `curso` (`id`),
  ADD CONSTRAINT `curso_modulo_ibfk_2` FOREIGN KEY (`moduloId`) REFERENCES `modulo` (`id`);

ALTER TABLE `proyecto_centro`
  ADD CONSTRAINT `proyecto_centro_ibfk_1` FOREIGN KEY (`proyectoId`) REFERENCES `proyecto` (`id`),
  ADD CONSTRAINT `proyecto_centro_ibfk_2` FOREIGN KEY (`centroId`) REFERENCES `centro_educativo` (`id`);

ALTER TABLE `rol_usuario`
  ADD CONSTRAINT `rol_usuario_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `rol` (`id`),
  ADD CONSTRAINT `rol_usuario_ibfk_2` FOREIGN KEY (`tokken`) REFERENCES `usuario` (`tokken`) ON DELETE CASCADE;

ALTER TABLE `titulo_curso`
  ADD CONSTRAINT `titulo_curso_ibfk_1` FOREIGN KEY (`tituloId`) REFERENCES `titulo` (`id`),
  ADD CONSTRAINT `titulo_curso_ibfk_2` FOREIGN KEY (`cursoId`) REFERENCES `curso` (`id`);

ALTER TABLE `usuario_proyecto`
  ADD CONSTRAINT `usuario_proyecto_ibfk_1` FOREIGN KEY (`tokken`) REFERENCES `usuario` (`tokken`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario_proyecto_ibfk_2` FOREIGN KEY (`proyectoId`) REFERENCES `proyecto` (`id`);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
