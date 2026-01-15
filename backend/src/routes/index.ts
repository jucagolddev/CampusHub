/**
 * ARCHIVO: routes/index.ts
 * AUTOR: Equipo de Desarrollo CampusHub
 * FECHA: Actualizado el 15 de Enero de 2026
 *
 * DESCRIPCIÓN:
 * Este archivo actúa como un "Hub Central" de enrutamiento.
 * Su función es importar los archivos de rutas específicos de cada entidad
 * (Usuarios, Proyectos, Centros, etc.) y asignarlos a una ruta base.
 *
 * MANTENIBILIDAD:
 * Si se añade una nueva entidad (ej. "Notificaciones"), solo hay que importarla aquí
 * y añadir una línea `router.use`.
 */

import { Router } from 'express';

// Importación de módulos de rutas
// TODO: Asegurarse de ir migrando estos archivos uno a uno
import userRoutes from './userRoutes';
import projectRoutes from './projectRoutes';

import centroRoutes from './centroRoutes';
import tituloRoutes from './tituloRoutes';
import cursoRoutes from './cursoRoutes';
import moduloRoutes from './moduloRoutes';
import rolRoutes from './rolRoutes';
import relationRoutes from './relationRoutes';

const router = Router();

// ==========================================
// DEFINICIÓN DE RUTAS BASE
// ==========================================

// Rutas de Usuarios (Login, Registro) -> /api/users
// (Ya montado en server.ts, pero si se usa aquí sería una sub-ruta)
// Nota: En server.ts ya definimos /api/users -> userRoutes.
// Aquí definimos las rutas que cuelgan de /api (si se montó indexRoutes en /api)

// Entidades Principales
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

// Entidades Secundarias
router.use('/centros', centroRoutes);
router.use('/titulos', tituloRoutes);
router.use('/cursos', cursoRoutes);
router.use('/modulos', moduloRoutes);
router.use('/roles', rolRoutes);
router.use('/relations', relationRoutes);

export default router;
