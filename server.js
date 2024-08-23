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
        //const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 AND tipo = 'Orden de compra'");
        const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 ORDER BY id DESC");

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});
// OBTENER TODAS LAS COMPRAS AUTORIZADAS
app.get('/api/autorizados', async (req, res) => { 
    try {
        const result = await pool.query('SELECT * FROM compras WHERE estatus = 3 ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});
// OBTENER CON LA ID DE COMPRA LOS DATOS DEL REGISTRO
app.get('/api/compra/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM compras WHERE id = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// ACTUALIZAR CON LA ID DE COMPRA EL ESTATUS DEL REGISTRO
app.get('/api/autorizar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE compras SET estatus = 3 WHERE id = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// ACTUALIZAR CON LA ID DE COMPRA EL ESTATUS DEL REGISTRO
app.get('/api/revertir/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE compras SET estatus = 2 WHERE id = $1', [id]);
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