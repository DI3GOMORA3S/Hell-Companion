import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/api/planetas', async (req, res) => {
    try {
      const response = await axios.get('https://helldiverstrainingmanual.com/api/v1/war/status');
      const planetas = response.data.planetStatus;
      res.json(planetas); // 🔥 enviás solo la info que necesitás
    } catch (err) {
      console.error('Error al obtener datos de la API', err.message);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

app.get('/api/planet-info', async (req, res) => {
try {
    const response = await axios.get('https://helldiverstrainingmanual.com/api/v1/planets');
    const planetInfo = response.data;
    res.json(planetInfo);
} catch (err) {
    console.error('Error al obtener datos de la API', err.message);
    res.status(500).json({ error: 'Error interno del servidor' });
}
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});