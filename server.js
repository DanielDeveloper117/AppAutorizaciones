const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    //host: '187.189.75.29',
    //host: '192.168.1.220',
    //port: 5432,
    //database: 'PLAT_AUTORIZACIONES',
    //user: 'postgres',
    //password: 'kepler123'

    host: 'localhost',
    port: '5432',
    database: 'notificaciones_prueba',
    user: 'postgres',
    password: '4866',
});

// Habilitar CORS
app.use(cors());
app.use(express.json()); // Necesario para procesar cuerpos JSON en peticiones POST

// OBTENER TODAS LAS COMPRAS PENDIENTES DE AUTORIZAR
app.get('/api/compras', async (req, res) => { 
    try {
        const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 ORDER BY id DESC");
        //const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = 2 ORDER BY id_compra DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// OBTENER TODAS LAS ORDENES DE COMPRA PENDIENTES DE AUTORIZAR
app.get('/api/compras/oc', async (req, res) => { 
    try {
        const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 AND tipo = 'Orden de compra' ORDER BY id DESC");
        //const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = 2 AND c31_tipo = '' ORDER BY id_compra DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener ordenes de compra');
    }
});

// OBTENER TODAS LAS SOLICITUDES DE GASTOS PENDIENTES DE AUTORIZAR
app.get('/api/compras/sg', async (req, res) => { 
    try {
        const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 AND tipo = 'Solicitud de gastos' ORDER BY id DESC");
        //const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = 2 AND c31_tipo = 'Sol' ORDER BY id_compra DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las solicitudes de gastos');
    }
});

// OBTENER TODAS LAS COMPRAS AUTORIZADAS
app.get('/api/autorizados', async (req, res) => { 
    try {
        const result = await pool.query('SELECT * FROM compras WHERE estatus = 3 ORDER BY id DESC');
        //const result = await pool.query('SELECT * FROM estatus_kepler WHERE c72_estatus = 3 ORDER BY id_compra DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// OBTENER TODAS LAS ORDENES DE COMPRA AUTORIZADAS
app.get('/api/autorizados/oc', async (req, res) => { 
    try {
        const result = await pool.query("SELECT * FROM compras WHERE estatus = 3 AND tipo = 'Orden de compra' ORDER BY id DESC");
        //const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = 2 AND c31_tipo = '' ORDER BY id_compra DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener ordenes de compra');
    }
});

// OBTENER TODAS LAS SOLICITUDES DE GASTOS AUTORIZADAS
app.get('/api/autorizados/sg', async (req, res) => { 
    try {
        const result = await pool.query("SELECT * FROM compras WHERE estatus = 3 AND tipo = 'Solicitud de gastos' ORDER BY id DESC");
        //const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = 2 AND c31_tipo = 'Sol' ORDER BY id_compra DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las solicitudes de gastos');
    }
});

// OBTENER CON LA ID DE COMPRA LOS DATOS DEL REGISTRO
app.get('/api/compra/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM compras WHERE id = $1', [id]);
        // const result = await pool.query('SELECT * FROM estatus_kepler WHERE id_compra = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Fallo al obtener los datos');
    }
});

// ACTUALIZAR CON LA ID DE COMPRA EL ESTATUS DEL REGISTRO
app.get('/api/autorizar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE compras SET estatus = 3 WHERE id = $1', [id]);
        //const result = await pool.query('UPDATE estatus_kepler SET c72_estatus = 3 WHERE id_compra = $1', [id]);
        res.json({ updated: result.rowCount });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar los datos');
    }
});

// REVERTIR EL ESTATUS DEL REGISTRO
app.get('/api/revertir/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE compras SET estatus = 2 WHERE id = $1', [id]);
        //const result = await pool.query('UPDATE estatus_kepler SET c72_estatus = 2 WHERE id_compra = $1', [id]);
        res.json({ updated: result.rowCount });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar los datos');
    }
});

// AUTENTICAR USUARIO
app.post('/api/login', async (req, res) => {
    const { usuario, pass } = req.body;

    if (!usuario || !pass) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
    }

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1 AND pass = $2', [usuario, pass]);

        if (result.rows.length > 0) {
            res.json({ authenticated: true });
        } else {
            res.status(401).json({ authenticated: false, message: 'Credenciales incorrectas' });
        }
    } catch (err) {
        console.error('Error en la autenticación:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});




// Iniciar el servidor en el puerto 3000
app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor corriendo en http://0.0.0.0:3000');
});
