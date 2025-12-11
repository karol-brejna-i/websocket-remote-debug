/**
 * Main Entry Point
 * 
 * Web application for remote debugging of ESP32/ESP8266 Arduino devices
 * over WebSocket connection.
 */

import './styles/main.css';
import { App } from './components/App';
import { VERSION_INFO } from './version';

// Log version information
console.log(`%c🚀 WSTerm ${VERSION_INFO.fullVersion}`, 'font-weight: bold; font-size: 14px;');
console.log(`   Version: ${VERSION_INFO.version}`);
console.log(`   Commit: ${VERSION_INFO.commit} (${VERSION_INFO.branch})`);
console.log(`   Built: ${new Date(VERSION_INFO.buildDate).toLocaleString()}`);
if (VERSION_INFO.isDirty) {
  console.warn('   ⚠️  Running modified build (uncommitted changes)');
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  
  if (!appElement) {
    console.error('App container not found');
    return;
  }

  // Create and initialize the app
  const app = new App(appElement);
  app.init();

  // Expose app instance for debugging (development only)
  if (import.meta.env.DEV) {
    (window as unknown as { app: App }).app = app;
  }
});
