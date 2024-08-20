const { Pool } = require('pg');

// Configuración de la base de datos
const pool = new Pool({
  host: 'localhost',
  port: 5432, // Asegúrate de que el puerto esté configurado correctamente
  database: 'notificaciones_prueba',
  user: 'postgres',
  password: '4866'
});

// Verificar la conexión
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error al conectar a la base de datos', err.stack);
  }
  console.log('¡Conexión a PostgreSQL exitosa!');
  release();
});

module.exports = pool;

