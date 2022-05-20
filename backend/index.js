import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.use(express.json())
dotenv.config()

conectarDB();

// routing
app.use('/api/users', userRouter)
app.use('/api/projects', projectRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto  ${PORT}`);
});

