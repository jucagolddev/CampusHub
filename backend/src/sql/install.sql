-- SCRIPT DE INSTALACIÓN COMPLETA - CAMPUS HUB
-- Fecha: 15/01/2026
-- Descripción: Este script reinicia la base de datos completa.
-- ADVERTENCIA: SE PERDERÁN TODOS LOS DATOS EXISTENTES.

DROP DATABASE IF EXISTS proyecto_integrado;
CREATE DATABASE proyecto_integrado CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE proyecto_integrado;

-- 1. ESTRUCTURA DE TABLAS (DDL)

-- Tabla: Usuario
CREATE TABLE usuario (
  tokken VARCHAR(255) NOT NULL,
  userName VARCHAR(255) NOT NULL,
  passwrd VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  fecCreacion DATETIME NOT NULL,
  PRIMARY KEY (tokken)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: Rol
CREATE TABLE rol (
  id INT NOT NULL AUTO_INCREMENT,
  nombreGrupo VARCHAR(50) NOT NULL,
  permisos CHAR(1) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nombreGrupo (nombreGrupo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: Centro Educativo
CREATE TABLE centro_educativo (
  id INT NOT NULL AUTO_INCREMENT,
  nombreCentro VARCHAR(255) NOT NULL,
  sufijoEmail VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nombreCentro (nombreCentro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: Título
CREATE TABLE titulo (
  id INT NOT NULL AUTO_INCREMENT,
  nombreTitulo VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla: Proyecto
CREATE TABLE proyecto (
  id INT NOT NULL AUTO_INCREMENT,
  nombreProyecto VARCHAR(255) NOT NULL,
  descripcionProyecto VARCHAR(255) NOT NULL,
  urlProyecto VARCHAR(255) NOT NULL,
  urlGitHub VARCHAR(255) NOT NULL,
  imgPortada VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Relación: Rol - Usuario
CREATE TABLE rol_usuario (
  rolId INT NOT NULL,
  tokken VARCHAR(255) NOT NULL,
  PRIMARY KEY (rolId, tokken),
  KEY tokken (tokken),
  CONSTRAINT rol_usuario_ibfk_1 FOREIGN KEY (rolId) REFERENCES rol (id),
  CONSTRAINT rol_usuario_ibfk_2 FOREIGN KEY (tokken) REFERENCES usuario (tokken) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Relación: Usuario - Proyecto (Creadores)
CREATE TABLE usuario_proyecto (
  tokken VARCHAR(255) NOT NULL,
  proyectoId INT NOT NULL,
  creadorProyecto TINYINT(1) NOT NULL,
  PRIMARY KEY (tokken, proyectoId),
  KEY proyectoId (proyectoId),
  CONSTRAINT usuario_proyecto_ibfk_1 FOREIGN KEY (tokken) REFERENCES usuario (tokken) ON DELETE CASCADE,
  CONSTRAINT usuario_proyecto_ibfk_2 FOREIGN KEY (proyectoId) REFERENCES proyecto (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Relación: Usuario - Datos Académicos (Nueva Expansión)
CREATE TABLE usuario_academico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tokken VARCHAR(255) NOT NULL,
  centroId INT NOT NULL,
  tituloId INT NOT NULL,
  FOREIGN KEY (tokken) REFERENCES usuario(tokken) ON DELETE CASCADE,
  FOREIGN KEY (centroId) REFERENCES centro_educativo(id),
  FOREIGN KEY (tituloId) REFERENCES titulo(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Relación: Centro - Título (Oferta académica)
CREATE TABLE centro_titulo (
  centroId INT NOT NULL,
  tituloId INT NOT NULL,
  PRIMARY KEY (centroId, tituloId),
  KEY tituloId (tituloId),
  CONSTRAINT centro_titulo_ibfk_1 FOREIGN KEY (centroId) REFERENCES centro_educativo (id),
  CONSTRAINT centro_titulo_ibfk_2 FOREIGN KEY (tituloId) REFERENCES titulo (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. DATOS MAESTROS (DML)

-- Roles
INSERT INTO rol (id, nombreGrupo, permisos) VALUES
(1, 'Administrador', 'A'),
(2, 'Profesor', 'P'),
(3, 'Alumno', 'S');

-- Centros Educativos
INSERT INTO centro_educativo (id, nombreCentro, sufijoEmail) VALUES
(1, 'Campus Central', '@campus.edu'),
(2, 'Facultad de Ingeniería', '@ing.campus.edu'),
(3, 'Escuela de Artes', '@artes.campus.edu');

-- Títulos
INSERT INTO titulo (id, nombreTitulo) VALUES
(1, 'Ingeniería de Software'),
(2, 'Marketing Digital'),
(3, 'Diseño Gráfico'),
(4, 'Administración de Empresas');

-- Vinculación Centro-Título (Ejemplo)
INSERT INTO centro_titulo (centroId, tituloId) VALUES 
(2, 1), -- Ing. en Facultad Ing.
(3, 3), -- Diseño en Artes
(1, 2), -- Marketing en Campus
(1, 4); -- ADE en Campus

-- 3. DATOS DE EJEMPLO

-- Usuario de Prueba (testuser)
-- Pass: 'password123' (hash bcrypt aproximado para pruebas, o generar uno real)
-- Nota: Usaremos el hash que vimos en el dump original o generaremos uno nuevo si es posible.
-- Para simplificar, insertamos el usuario 'juan' del dump original pero con token fijo para los proyectos.
INSERT INTO usuario (tokken, userName, passwrd, email, fecCreacion) VALUES
('7e43b5e7-5c4e-478e-8616-ae4768dcd80f', 'testuser', '$2b$10$dPgSwntlm.VMtoSiR9/zzeXxM4gXuXh.tDon9k6CcPTyEdYPcEMaC', 'test@campus.edu', NOW());

-- Asignar Rol de Alumno a testuser
INSERT INTO rol_usuario (rolId, tokken) VALUES (3, '7e43b5e7-5c4e-478e-8616-ae4768dcd80f');

-- Asignar Datos Académicos a testuser (Facultad Ing - Software)
INSERT INTO usuario_academico (tokken, centroId, tituloId) VALUES 
('7e43b5e7-5c4e-478e-8616-ae4768dcd80f', 2, 1);

-- Proyectos de Ejemplo
INSERT INTO proyecto (id, nombreProyecto, descripcionProyecto, urlProyecto, urlGitHub, imgPortada) VALUES
(2, 'Panel de control avanzado para profesores con estadísticas de alumnos y gestión de notas.', 'Dashboard Docente', 'http://dashboard-edu.com', 'http://github.com/edu/dash', 'assets/images/dashboard.png'),
(3, 'Calendario Académico', 'Gestión eficiente de eventos, clases y entregas para toda la comunidad educativa.', 'http://calendar-app.com', 'http://github.com/edu/calendar', 'assets/images/calendar.png'),
(4, 'Gamificación Kahoot', 'Plataforma interactiva de cuestionarios en tiempo real tipo Kahoot para Gamificación.', 'http://quiz-game.com', 'http://github.com/edu/quiz', 'assets/images/quiz.png');

-- Vincular proyectos a testuser
INSERT INTO usuario_proyecto (tokken, proyectoId, creadorProyecto) VALUES 
('7e43b5e7-5c4e-478e-8616-ae4768dcd80f', 2, 1),
('7e43b5e7-5c4e-478e-8616-ae4768dcd80f', 3, 1),
('7e43b5e7-5c4e-478e-8616-ae4768dcd80f', 4, 1);

COMMIT;
