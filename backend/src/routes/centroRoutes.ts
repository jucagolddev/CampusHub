import express from "express";
import * as c from "../controllers/centroController.js";
import authMiddleware, { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Definición de rutas CRUD para los Centros Educativos.
 * Accesibles desde: /api/centros/...
 */

router.post("/", authMiddleware, isAdmin, c.create); // POST /api/centros/ - Crear centro (Solo Admin)
router.get("/", c.list); // GET /api/centros/  - Listar todos (Público para desplegables)
router.put("/:id", authMiddleware, isAdmin, c.update); // PUT /api/centros/:id - Actualizar (Solo Admin)
router.delete("/:id", authMiddleware, isAdmin, c.remove); // DELETE /api/centros/:id - Borrar (Solo Admin)

export default router;
