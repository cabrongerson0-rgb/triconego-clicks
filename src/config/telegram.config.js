/**
 * Configuración centralizada de Telegram
 * @module config/telegram.config
 */

require('dotenv').config();

const telegramConfig = {
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  chatId: process.env.TELEGRAM_CHAT_ID,
  apiUrl: 'https://api.telegram.org',

  /**
   * Valida que las credenciales estén configuradas
   * @returns {boolean}
   */
  isConfigured() {
    return Boolean(this.botToken && this.chatId);
  },

  /**
   * Obtiene la URL completa del endpoint
   * @param {string} method - Método de la API de Telegram
   * @returns {string}
   */
  getEndpoint(method) {
    return `${this.apiUrl}/bot${this.botToken}/${method}`;
  }
};

module.exports = telegramConfig;
