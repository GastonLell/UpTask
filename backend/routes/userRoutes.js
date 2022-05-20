import express from "express";
const router = express.Router();
import checkAuth from '../middleware/checkAuth.js'
import { registerUser, authentication, confirmToken, fargotPassword, checkToken, newPassword, profile } from '../controllers/userControllers.js';

// Autenticacion, Registro y creacion de usuarios
router.post("/", registerUser);
router.post("/login", authentication)
router.get("/confirm/:token", confirmToken)

// olvide la contraseña
router.post("/fargot-password", fargotPassword)

// cuando la ruta es la misma pero distinto verbo
router.route("/reset-password/:token").get(checkToken).post(newPassword)

router.get("/profile", checkAuth, profile)

export default router;