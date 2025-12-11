/**
 * Test WebSocket Server for WSTerm autoscroll testing
 * 
 * Usage: node ws-server-test.cjs
 * Then connect WSTerm to localhost:8232
 */

const WebSocket = require('ws');

const PORT = 8232;
const wss = new WebSocket.Server({ port: PORT });

console.log(`🚀 Test WebSocket server running on ws://localhost:${PORT}`);
console.log('Connect WSTerm to localhost:8232 to test autoscroll\n');

const levels = ['V', 'D', 'I', 'W', 'E'];
let messageCount = 0;

wss.on('connection', (ws) => {
  console.log('✅ Client connected');
  
  // Send initial handshake
  ws.send('$app:V:1.0.0:ESP32-Test::123456u:E:Y');
  ws.send('$app:L:3');
  ws.send('$app:M:45678u:');
  
  // Send a burst of test messages to test autoscroll
  const sendMessages = () => {
    const level = levels[Math.floor(Math.random() * levels.length)];
    const timestamp = formatTime(Date.now());
    messageCount++;
    const message = `${timestamp} [${level}] (test) (C0) Test message #${messageCount} - Autoscroll should keep this visible`;
    ws.send(message);
    console.log(`Sent: ${message}`);
  };

  // Send 20 messages quickly to test autoscroll
  console.log('\n📨 Sending burst of messages...');
  for (let i = 0; i < 20; i++) {
    setTimeout(sendMessages, i * 100);
  }

  // Then continue sending every 2 seconds
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      sendMessages();
    } else {
      clearInterval(interval);
    }
  }, 2000);

  ws.on('message', (data) => {
    console.log(`📥 Received: ${data}`);
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
    clearInterval(interval);
  });
});

function formatTime(ms) {
  const date = new Date(ms);
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  const mmm = String(date.getMilliseconds()).padStart(3, '0');
  return `${hh}:${mm}:${ss}.${mmm}`;
}
