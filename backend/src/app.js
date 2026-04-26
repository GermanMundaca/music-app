import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import songsRoutes from './routes/songs.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';



const app = express();

app.use(cors());
app.use(express.json());

/* verificacion funcionamiento api*/ 
app.get('/', (req, res) => {
  res.send('API funcionando');
});
//manejo de errores
app.use(errorHandler);
/*conexion de rutas*/
app.use('/api/songs', songsRoutes);

/*test db conexion*/
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error DB');
  }
});

export default app;