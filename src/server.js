/**
 * Servidor principal
 * @module server
 */

const app = require('./app');
const serverConfig = require('./config/server.config');
const telegramConfig = require('./config/telegram.config');

/**
 * Inicia el servidor
 */
const startServer = () => {
  try {
    // Validar configuración de Telegram
    if (!telegramConfig.isConfigured()) {
      console.error('❌ ERROR: Telegram no está configurado correctamente');
      console.error('Por favor verifica las variables de entorno en .env');
      process.exit(1);
    }

    // Iniciar servidor
    const server = app.listen(serverConfig.port, () => {
      console.log('╔════════════════════════════════════════════════╗');
      console.log('║   Bot de Telegram - Sistema de Notificaciones ║');
      console.log('╚════════════════════════════════════════════════╝');
      console.log(`\n✅ Servidor iniciado correctamente`);
      console.log(`🌐 Puerto: ${serverConfig.port}`);
      console.log(`🤖 Bot de Telegram: Configurado`);
      console.log(`💬 Chat ID: ${telegramConfig.chatId}`);
      console.log(`📊 Entorno: ${serverConfig.env}`);
      console.log(`\n🔗 URL: http://localhost:${serverConfig.port}`);
      console.log(`\n⏳ Esperando visitas...\n`);
    });

    // Manejo de cierre graceful
    const gracefulShutdown = (signal) => {
      console.log(`\n\n⚠️  Señal ${signal} recibida, cerrando servidor...`);
      server.close(() => {
        console.log('✅ Servidor cerrado correctamente');
        process.exit(0);
      });

      // Forzar cierre después de 10 segundos
      setTimeout(() => {
        console.error('❌ Cierre forzado del servidor');
        process.exit(1);
      }, 10000);
    };

    // Escuchar señales de terminación
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Manejo de errores no capturados
    process.on('uncaughtException', (error) => {
      console.error('❌ Excepción no capturada:', error);
      gracefulShutdown('uncaughtException');
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('❌ Promesa rechazada no manejada:', reason);
      gracefulShutdown('unhandledRejection');
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

// Iniciar servidor
startServer();
