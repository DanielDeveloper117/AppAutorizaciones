const express = require('express');
const app = express();
const { Pool } = require('pg');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Importar nodemailer

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
    //host: '187.189.75.29',
    host: '192.168.1.220',
    port: 5432,
    database: 'PLAT_AUTORIZACIONES',
    user: 'postgres',
    password: 'kepler123'

    //host: 'localhost',
    //port: '5432',
    //database: 'notificaciones_prueba',
    //user: 'postgres',
    //password: '4866',
});

// Habilitar CORS
app.use(cors());
app.use(express.json()); // Necesario para procesar cuerpos JSON en peticiones POST

// Configuración del transportador de nodemailer
const transporter = nodemailer.createTransport({
    host: 'sellosyretenes.com',  // Servidor SMTP
    port: 465,  // Puerto SMTP para conexiones seguras (SSL)
    secure: true,  // Usar SSL/TLS
    auth: {
        user: 'desarrollo2.sistemas@sellosyretenes.com', 
        pass: 'Temporal02#' 
    }
});

// OBTENER TODAS LAS COMPRAS PENDIENTES DE AUTORIZAR DIRECTORES 
app.get('/api/compras', async (req, res) => { 
    try {
        //const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 ORDER BY id DESC");
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '2' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// OBTENER TODAS LAS COMPRAS PENDIENTES DE AUTORIZAR GERENTES
app.get('/api/compras/gerentes', async (req, res) => { 
    try {
        //const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 ORDER BY id DESC");
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '1' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// OBTENER TODAS LAS ORDENES DE COMPRA PENDIENTES DE AUTORIZAR DIRECTORES
app.get('/api/compras/oc', async (req, res) => { 
    try {
        //const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 AND tipo = 'Orden de compra' ORDER BY id DESC");
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '2' AND c31_tipo = 'Sol' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener ordenes de compra');
    }
});

// OBTENER TODAS LAS ORDENES DE COMPRA PENDIENTES DE AUTORIZAR GERENTES
app.get('/api/compras/oc/gerentes', async (req, res) => { 
    try {
        //const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 AND tipo = 'Orden de compra' ORDER BY id DESC");
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '1' AND c31_tipo = 'Sol' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener ordenes de compra');
    }
});

// OBTENER TODAS LAS SOLICITUDES DE GASTOS PENDIENTES DE AUTORIZAR DIRECTORES
app.get('/api/compras/sg', async (req, res) => { 
    try {
        //const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 AND tipo = 'Solicitud de gastos' ORDER BY id DESC");
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '2' AND c31_tipo = 'Sol' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las solicitudes de gastos');
    }
});

// OBTENER TODAS LAS SOLICITUDES DE GASTOS PENDIENTES DE AUTORIZAR GERENTES
app.get('/api/compras/sg/gerentes', async (req, res) => { 
    try {
        //const result = await pool.query("SELECT * FROM compras WHERE estatus = 2 AND tipo = 'Solicitud de gastos' ORDER BY id DESC");
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '1' AND c31_tipo = 'Sol' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las solicitudes de gastos');
    }
});

// OBTENER TODAS LAS COMPRAS AUTORIZADAS DIRECTORES
app.get('/api/autorizados', async (req, res) => { 
    try {
        // const result = await pool.query('SELECT * FROM compras WHERE estatus = 3 ORDER BY id DESC');
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '3' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// OBTENER TODAS LAS COMPRAS AUTORIZADAS gerentes
app.get('/api/autorizados/gerentes', async (req, res) => { 
    try {
        // const result = await pool.query('SELECT * FROM compras WHERE estatus = 3 ORDER BY id DESC');
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '2' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los datos');
    }
});

// OBTENER TODAS LAS ORDENES DE COMPRA AUTORIZADAS DIRECTORES
app.get('/api/autorizados/oc', async (req, res) => { 
    try {
        // const result = await pool.query("SELECT * FROM compras WHERE estatus = 3 AND tipo = 'Orden de compra' ORDER BY id DESC");
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '3' AND c31_tipo = 'Sol' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener ordenes de compra');
    }
});

// OBTENER TODAS LAS ORDENES DE COMPRA AUTORIZADAS GERENTES
app.get('/api/autorizados/oc/gerentes', async (req, res) => { 
    try {
        // const result = await pool.query("SELECT * FROM compras WHERE estatus = 3 AND tipo = 'Orden de compra' ORDER BY id DESC");
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '2' AND c31_tipo = 'Sol' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener ordenes de compra');
    }
});

// OBTENER TODAS LAS SOLICITUDES DE GASTOS AUTORIZADAS DIRECTORES
app.get('/api/autorizados/sg', async (req, res) => { 
    try {
        //const result = await pool.query("SELECT * FROM compras WHERE estatus = 3 AND tipo = 'Solicitud de gastos' ORDER BY id DESC");
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '3' AND c31_tipo = 'Sol' ORDER BY c9_fecha DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener las solicitudes de gastos');
    }
});

// OBTENER TODAS LAS SOLICITUDES DE GASTOS AUTORIZADAS DIRECTORES
app.get('/api/autorizados/sg/gerentes', async (req, res) => { 
    try {
        //const result = await pool.query("SELECT * FROM compras WHERE estatus = 3 AND tipo = 'Solicitud de gastos' ORDER BY id DESC");
        const result = await pool.query("SELECT * FROM estatus_kepler WHERE c72_estatus = '2' AND c31_tipo = 'Sol' ORDER BY c9_fecha DESC");
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
        //const result = await pool.query('SELECT * FROM compras WHERE id = $1', [id]);
        const result = await pool.query('SELECT * FROM estatus_kepler WHERE id_compra = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Fallo al obtener los datos');
    }
});

// ACTUALIZAR CON LA ID DE COMPRA EL ESTATUS DEL REGISTRO
app.get('/api/autorizar/gerentes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        //const result = await pool.query('UPDATE compras SET estatus = 3 WHERE id = $1', [id]);
        const result = await pool.query("UPDATE estatus_kepler SET c72_estatus = '2' WHERE id_compra = $1", [id]);
        res.json({ updated: result.rowCount });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar los datos');
    }
});
// REVERTIR EL ESTATUS DEL REGISTRO DIRECTORES
app.get('/api/revertir/:id', async (req, res) => {
    const { id } = req.params;
    try {
        //const result = await pool.query('UPDATE compras SET estatus = 2 WHERE id = $1', [id]);
        const result = await pool.query("UPDATE estatus_kepler SET c72_estatus = '2' WHERE id_compra = $1", [id]);
        res.json({ updated: result.rowCount });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar los datos');
    }
});

// REVERTIR EL ESTATUS DEL REGISTRO GERENTES
app.get('/api/revertir/gerentes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        //const result = await pool.query('UPDATE compras SET estatus = 2 WHERE id = $1', [id]);
        const result = await pool.query("UPDATE estatus_kepler SET c72_estatus = '1' WHERE id_compra = $1", [id]);
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
            // Suponiendo que el tipo de usuario está en una columna llamada "tipo_usuario"
            const tipoUsuario = result.rows[0].tipo_usuario; 
            
            res.json({ authenticated: true, usuario: tipoUsuario });
        } else {
            res.status(401).json({ authenticated: false, message: 'Credenciales incorrectas' });
        }
    } catch (err) {
        console.error('Error en la autenticación:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


// ACTUALIZAR CON LA ID DE COMPRA EL ESTATUS DEL REGISTRO
// app.get('/api/autorizar/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const result = await pool.query("UPDATE estatus_kepler SET c72_estatus = '3' WHERE id_compra = $1", [id]);

//         if (result.rowCount > 0) {
//             // Si se actualizó la compra, enviar un correo
//             const mailOptions = {
//                 from: 'desarrollo2.sistemas@sellosyretenes.com',
//                 to: 'sistemas@sellosyretenes.com',
//                 subject: 'Compra Autorizada',
//                 text: `La compra con ID ${id} ha sido autorizada.`
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.error('Error al enviar el correo:', error);
//                     return res.status(500).json({ updated: result.rowCount, emailSent: false, error: 'Error al enviar el correo.' });
//                 }
//                 console.log('Correo enviado:', info.response);
//                 res.json({ updated: result.rowCount, emailSent: true });
//             });
//         } else {
//             res.json({ updated: result.rowCount, emailSent: false });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error al actualizar los datos');
//     }
// });

// ACTUALIZAR CON LA ID DE COMPRA EL ESTATUS DEL REGISTRO
app.get('/api/autorizar/:id', async (req, res) => {
    const { id } = req.params;
    let folio = '';

    try {
        // Obtener el folio antes de la actualización
        const result = await pool.query('SELECT * FROM estatus_kepler WHERE id_compra = $1', [id]);
        
        if (result.rows.length > 0) {
            folio = result.rows[0].c6_folio; // Obtener el folio del primer resultado

            // Actualizar el estatus
            const updateResult = await pool.query("UPDATE estatus_kepler SET c72_estatus = '3' WHERE id_compra = $1", [id]);

            if (updateResult.rowCount > 0) {
                // Si se actualizó la compra, enviar un correo
                const mailOptions = {
                    from: 'desarrollo2.sistemas@sellosyretenes.com',
                    to: 'desarrollo.sistemas@sellosyretenes.com',
                    subject: 'Compra Autorizada',
                    text: `La compra con folio: ${folio} ha sido autorizada por dirección.`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error al enviar el correo:', error);
                        return res.status(500).json({ updated: updateResult.rowCount, emailSent: false, error: 'Error al enviar el correo.' });
                    }
                    console.log('Correo enviado:', info.response);
                    res.json({ updated: updateResult.rowCount, emailSent: true });
                });
            } else {
                res.json({ updated: updateResult.rowCount, emailSent: false });
            }
        } else {
            res.status(404).send('Registro no encontrado');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al procesar la solicitud');
    }
});


// Iniciar el servidor en el puerto 3000
app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor corriendo en http://0.0.0.0:3000');
});
