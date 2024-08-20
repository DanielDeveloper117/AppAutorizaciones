const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');


// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'notificaciones_prueba',
    password: '4866',
    port: 5432,
});

// Habilitar CORS
app.use(cors());
// OBTENER TODAS LAS COMPRAS PENDIENTES DE AUTORIZAR
app.get('/api/compras', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM compras WHERE estatus = 2');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor corriendo en http://0.0.0.0:3000');
});

