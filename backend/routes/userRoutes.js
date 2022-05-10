import express from "express";
const router = express.Router();
import { registerUser } from '../controllers/userControllers.js';

// Autenticacion, Registro y creacion de usuarios

router.post('/', registerUser);


export default router;