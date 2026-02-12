/**
 * Script de prueba para verificar credenciales de Telegram
 */

const axios = require('axios');
require('dotenv').config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function testTelegram() {
  console.log('🔍 Verificando configuración de Telegram...\n');
  
  console.log('Token:', TELEGRAM_BOT_TOKEN ? '✅ Configurado' : '❌ No encontrado');
  console.log('Chat ID:', TELEGRAM_CHAT_ID ? `✅ ${TELEGRAM_CHAT_ID}` : '❌ No encontrado');
  
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('\n❌ Faltan credenciales en .env');
    process.exit(1);
  }

  console.log('\n📡 Probando conexión con la API de Telegram...');

  try {
    // Verificar que el bot existe
    const botInfo = await axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`);
    console.log('✅ Bot encontrado:', botInfo.data.result.username);

    // Enviar mensaje de prueba
    console.log('\n📤 Enviando mensaje de prueba...');
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_CHAT_ID,
        text: '🧪 <b>MENSAJE DE PRUEBA</b>\n\n✅ El bot de Telegram está funcionando correctamente.\n🕐 ' + new Date().toLocaleString('es-CO'),
        parse_mode: 'HTML'
      }
    );

    if (response.data.ok) {
      console.log('✅ ¡Mensaje enviado exitosamente!');
      console.log('📱 Revisa tu chat de Telegram');
    } else {
      console.error('❌ Error al enviar mensaje:', response.data);
    }

  } catch (error) {
    console.error('\n❌ ERROR:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 400) {
        console.error('\n⚠️  Posibles causas:');
        console.error('   - El Chat ID es incorrecto');
        console.error('   - El bot no está agregado al grupo/chat');
        console.error('   - El bot no tiene permisos para enviar mensajes');
      } else if (error.response.status === 401) {
        console.error('\n⚠️  El token del bot es inválido');
      }
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

testTelegram();
