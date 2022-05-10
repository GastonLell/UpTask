import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json())
dotenv.config()

conectarDB();

// routing
app.use('/api/usuarios', usuarioRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto  ${PORT}`);
});
