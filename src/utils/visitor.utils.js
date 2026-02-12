/**
 * Utilidades para manejo de información del visitante
 * @module utils/visitor.utils
 */

class VisitorUtils {
  /**
   * Obtiene la IP real del visitante considerando proxies y balanceadores
   * @param {Object} req - Request de Express
   * @returns {string} Dirección IP del visitante
   */
  static getClientIp(req) {
    // Railway y otros servicios usan x-forwarded-for
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      // Toma la primera IP de la lista (IP original del cliente)
      return forwarded.split(',')[0].trim();
    }

    // Otros headers comunes para proxies
    return (
      req.headers['x-real-ip'] ||
      req.headers['cf-connecting-ip'] || // Cloudflare
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
      'IP no disponible'
    );
  }

  /**
   * Formatea la fecha y hora actual
   * @returns {string} Fecha formateada
   */
  static getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleString('es-CO', {
      timeZone: 'America/Bogota',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  /**
   * Recopila datos del visitante
   * @param {Object} req - Request de Express
   * @returns {Object} Datos del visitante
   */
  static collectVisitorData(req) {
    return {
      ip: this.getClientIp(req),
      timestamp: this.getCurrentTimestamp(),
      userAgent: req.headers['user-agent'] || 'No disponible',
      referer: req.headers['referer'] || 'Acceso directo',
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    };
  }
}

module.exports = VisitorUtils;
