/**
 * Middleware para capturar y notificar visitas
 * @module middleware/visitor.middleware
 */

const telegramService = require('../services/telegram.service');
const VisitorUtils = require('../utils/visitor.utils');

class VisitorMiddleware {
  /**
   * Middleware para rastrear y notificar visitantes
   * @param {Object} req - Request
   * @param {Object} res - Response
   * @param {Function} next - Next middleware
   */
  static async trackVisitor(req, res, next) {
    try {
      // Recopilar datos del visitante
      const visitorData = VisitorUtils.collectVisitorData(req);

      // Enviar notificación de forma asíncrona (no bloqueante)
      telegramService.notifyNewVisitor(visitorData)
        .then(result => {
          if (result.success) {
            console.log(`✅ Notificación enviada para IP: ${visitorData.ip}`);
          } else {
            console.error(`❌ Error al notificar: ${result.error}`);
          }
        })
        .catch(error => {
          console.error('❌ Error inesperado:', error.message);
        });

      // Continuar con la siguiente función sin esperar
      next();
    } catch (error) {
      console.error('Error en middleware de visitante:', error.message);
      // Continuar incluso si hay error para no afectar la experiencia del usuario
      next();
    }
  }
}

module.exports = VisitorMiddleware;
