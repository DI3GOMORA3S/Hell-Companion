const express = require('express');
const app = express();
const PORT = 3000;

// Servir archivos estáticos desde /public
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});