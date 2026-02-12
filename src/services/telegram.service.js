/**
 * Servicio de Telegram para envío de notificaciones
 * @module services/telegram.service
 */

const axios = require('axios');
const telegramConfig = require('../config/telegram.config');

class TelegramService {
  /**
   * Envía un mensaje de texto al chat configurado
   * @param {string} message - Mensaje a enviar
   * @returns {Promise<Object>} Respuesta de la API de Telegram
   */
  async sendMessage(message) {
    try {
      if (!telegramConfig.isConfigured()) {
        throw new Error('Telegram no está configurado correctamente');
      }

      const url = telegramConfig.getEndpoint('sendMessage');
      
      const response = await axios.post(url, {
        chat_id: telegramConfig.chatId,
        text: message,
        parse_mode: 'HTML'
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error al enviar mensaje de Telegram:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Formatea el mensaje de nueva visita
   * @param {Object} visitorData - Datos del visitante
   * @returns {string} Mensaje formateado
   */
  formatVisitorMessage(visitorData) {
    const { ip, timestamp, userAgent } = visitorData;
    
    return `
🔔 <b>NUEVO INGRESO</b>

📍 <b>IP:</b> <code>${ip}</code>
🕐 <b>Fecha/Hora:</b> ${timestamp}
🌐 <b>User Agent:</b> ${userAgent || 'No disponible'}

✅ Acceso registrado exitosamente
    `.trim();
  }

  /**
   * Notifica una nueva visita
   * @param {Object} visitorData - Datos del visitante
   * @returns {Promise<Object>}
   */
  async notifyNewVisitor(visitorData) {
    const message = this.formatVisitorMessage(visitorData);
    return await this.sendMessage(message);
  }
}

module.exports = new TelegramService();
