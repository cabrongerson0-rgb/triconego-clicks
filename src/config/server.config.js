/**
 * Configuración del servidor
 * @module config/server.config
 */

require('dotenv').config();

const serverConfig = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',

  /**
   * Verifica si está en modo producción
   * @returns {boolean}
   */
  isProduction() {
    return this.env === 'production';
  }
};

module.exports = serverConfig;
