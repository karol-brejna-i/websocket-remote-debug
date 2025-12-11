/**
 * About Modal Component
 * 
 * Displays app information, version, author, license, and links.
 */

import { VERSION_INFO } from '../version';

export interface AboutInfo {
  version: string;
  description: string;
}

export class AboutModal {
  private overlay: HTMLElement | null = null;
  private isOpen = false;
  private info: AboutInfo;

  constructor(info: AboutInfo) {
    this.info = info;
  }

  /**
   * Show the about modal
   */
  show(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.render();
    
    // Focus trap - close on Escape
    document.addEventListener('keydown', this.handleKeydown);
  }

  /**
   * Hide the about modal
   */
  hide(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    
    document.removeEventListener('keydown', this.handleKeydown);
    
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }

  /**
   * Toggle modal visibility
   */
  toggle(): void {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  private handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      this.hide();
    }
  };

  private render(): void {
    this.overlay = document.createElement('div');
    this.overlay.className = 'about-overlay';
    this.overlay.innerHTML = `
      <div class="about-modal" role="dialog" aria-labelledby="about-title" aria-modal="true">
        <button class="about-modal__close" aria-label="Close" id="about-close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        
        <div class="about-modal__header">
          <img src="./assets/WSTerm_icon.svg" alt="WSTerm" class="about-modal__logo">
          <h1 id="about-title" class="about-modal__title">
            <span class="about-modal__title--accent">WS</span>Term
          </h1>
          <span class="about-modal__version">v${this.info.version}</span>
        </div>
        
        <p class="about-modal__description">
          ${this.info.description}
        </p>
        
        <div class="about-modal__section">
          <h2 class="about-modal__section-title">Version Information</h2>
          <div class="about-modal__version-info">
            <div><strong>Version:</strong> ${VERSION_INFO.version}</div>
            <div><strong>Build:</strong> ${VERSION_INFO.fullVersion}</div>
            <div><strong>Commit:</strong> <code>${VERSION_INFO.commit}</code></div>
            <div><strong>Branch:</strong> ${VERSION_INFO.branch}</div>
            <div><strong>Status:</strong> ${VERSION_INFO.isDirty ? '⚠️ Modified' : '✓ Clean'}</div>
            <div><strong>Built:</strong> ${new Date(VERSION_INFO.buildDate).toLocaleString()}</div>
          </div>
        </div>
        
        <div class="about-modal__section">
          <h2 class="about-modal__section-title">About</h2>
          <p>
            A modern WebSocket terminal for remote debugging of ESP32/ESP8266 
            Arduino devices using the RemoteDebug library.
          </p>
        </div>
        
        <div class="about-modal__section">
          <h2 class="about-modal__section-title">Credits</h2>
          <ul class="about-modal__credits">
            <li>
              <strong>Author:</strong> 
              <a href="https://github.com/karol-brejna-i" target="_blank" rel="noopener">Karol Brejna</a>
            </li>
          </ul>
        </div>
        
        <div class="about-modal__section">
          <h2 class="about-modal__section-title">License</h2>
          <p>
            Apache License 2.0 © 2025
          </p>
        </div>
        
        <div class="about-modal__links">
          <a href="https://github.com/karol-brejna-i/websocket-remote-debug" target="_blank" rel="noopener" class="about-modal__link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub Repository
          </a>
        </div>
      </div>
    `;

    // Bind events
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.hide();
      }
    });

    this.overlay.querySelector('#about-close')?.addEventListener('click', () => {
      this.hide();
    });

    document.body.appendChild(this.overlay);
    
    // Animate in
    requestAnimationFrame(() => {
      this.overlay?.classList.add('about-overlay--visible');
    });
  }
}
