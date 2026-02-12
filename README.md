# 🤖 Bot de Telegram - Notificador de Visitas

Sistema profesional de notificaciones en tiempo real que envía alertas a Telegram cada vez que alguien visita tu página web.

## 📋 Características

- ✅ Notificaciones en tiempo real a Telegram
- 🌐 Captura de IP del visitante (compatible con proxies y balanceadores)
- 📊 Información detallada de cada visita (IP, fecha/hora, user agent)
- 🏗️ Arquitectura limpia con separación de responsabilidades
- 🔒 Manejo seguro de variables de entorno
- ⚡ Respuestas no bloqueantes (notificaciones asíncronas)
- 🎨 Página de bienvenida personalizada

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

El archivo `.env` ya está configurado con tus credenciales:

```env
TELEGRAM_BOT_TOKEN=8218791532:AAGzW0SC_1lxXeIJffJPZSj5h-h-AoHHXMQ
TELEGRAM_CHAT_ID=-5086285193
PORT=3000
NODE_ENV=production
```

### 3. Iniciar el servidor

```bash
npm start
```

## 📁 Estructura del Proyecto

```
BANCOL2-CLICKS/
├── src/
│   ├── config/
│   │   ├── telegram.config.js    # Configuración de Telegram
│   │   └── server.config.js       # Configuración del servidor
│   ├── services/
│   │   └── telegram.service.js    # Lógica de envío de mensajes
│   ├── middleware/
│   │   └── visitor.middleware.js  # Captura de visitas
│   ├── utils/
│   │   └── visitor.utils.js       # Utilidades para datos de visitantes
│   ├── app.js                     # Aplicación Express
│   └── server.js                  # Punto de entrada
├── .env                           # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Uso

Una vez iniciado el servidor, cada visita a `http://localhost:3000` (o tu URL de Railway) generará automáticamente una notificación en Telegram con:

- 📍 Dirección IP del visitante
- 🕐 Fecha y hora del acceso
- 🌐 User Agent del navegador
- ✅ Estado del registro

## 🌐 Deploy en Railway

1. Conecta tu repositorio a Railway
2. Las variables de entorno ya están en `.env`
3. Railway detectará automáticamente Node.js
4. El puerto se configura automáticamente desde `process.env.PORT`

## 📊 Endpoints Disponibles

- `GET /` - Página principal (envía notificación)
- `GET /health` - Estado del servidor

## 🎯 Patrones de Diseño Implementados

1. **Singleton Pattern**: Los servicios se exportan como instancias únicas
2. **Separation of Concerns**: Separación clara entre capas (config, services, middleware, utils)
3. **Middleware Pattern**: Interceptor de peticiones para rastreo
4. **Error Handling**: Manejo centralizado de errores
5. **Graceful Shutdown**: Cierre controlado del servidor

## 🔒 Seguridad

- Variables sensibles en `.env` (no incluir en control de versiones)
- Validación de configuración al inicio
- Manejo de errores sin exponer información sensible
- Notificaciones asíncronas (no bloquean la respuesta al usuario)

## 📝 Logs

El sistema muestra logs claros en consola:

```
✅ Notificación enviada para IP: 192.168.1.1
❌ Error al notificar: [mensaje de error]
```

## 🛠️ Tecnologías

- Node.js
- Express.js
- Axios (cliente HTTP)
- Telegram Bot API
- dotenv (variables de entorno)

## 📧 Soporte

Para reportar problemas o sugerencias, por favor crea un issue en el repositorio.

---

**Desarrollado con 💛 siguiendo las mejores prácticas de desarrollo**
