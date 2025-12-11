# WSTerm - Requirements Specification

This document defines the functional and non-functional requirements for WSTerm, a modern web-based terminal for debugging ESP32/ESP8266 microcontrollers.

---

## 1. Project Overview

### 1.1 Purpose
WSTerm is a modern, lightweight web application for remote debugging of ESP32 and ESP8266 Arduino devices over WebSocket. It provides a console-like interface for real-time debugging, command execution, and device monitoring.

### 1.2 Goals
- Provide real-time debugging capabilities for ESP devices
- Offer a modern, performant user interface
- Support both local and cloud-hosted deployment
- Maintain compatibility with RemoteDebug Arduino library
- Ensure accessibility and ease of use

### 1.3 Technology Stack
- **Frontend**: TypeScript 5.3+, Vite 5.0+, vanilla JavaScript (no frameworks)
- **Build System**: Vite with TypeScript compilation
- **Communication**: WebSocket (ws:// and wss://)
- **Target Platform**: Modern web browsers (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+)

---

## 2. Functional Requirements

### 2.1 Connection Management

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | Connect to ESP device via WebSocket on configurable port (default: 8232) | Must | ✓ |
| FR-02 | Support 'arduino' WebSocket subprotocol | Must | ✓ |
| FR-03 | Accept IP address or hostname input | Must | ✓ |
| FR-04 | Display connection status (disconnected/connecting/connected/error) | Must | ✓ |
| FR-05 | Disconnect from device on user request | Must | ✓ |
| FR-06 | Persist last used address in localStorage | Must | ✓ |
| FR-07 | Send `$app` handshake on connection | Must | ✓ |
| FR-08 | Handle connection errors gracefully with user feedback | Must | ✓ |
| FR-09 | Support both ws:// and wss:// protocols | Should | ✓ |
| FR-10 | Display connection latency/status indicators | Could | - |

### 2.2 Message Display

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-11 | Display incoming messages in scrollable console | Must | ✓ |
| FR-12 | Parse and render ANSI color codes | Must | ✓ |
| FR-13 | Color-code messages by debug level (V/D/I/W/E) | Must | ✓ |
| FR-14 | Display system messages (starting with `*`) distinctly | Must | ✓ |
| FR-15 | Auto-scroll to latest message (toggleable) | Must | ✓ |
| FR-16 | Clear console on user request | Must | ✓ |
| FR-17 | Display profiler timing with color-coded indicators | Should | ✓ |
| FR-18 | Handle high message volume (100+ msg/sec) without UI freeze | Must | ✓ |
| FR-19 | Support message filtering by text search | Must | ✓ |
| FR-20 | Support multiple message formats (timestamp, clock time, minimal) | Must | ✓ |
| FR-21 | Batch message rendering for performance | Must | ✓ |
| FR-22 | Limit console buffer to prevent memory issues | Must | ✓ |

### 2.3 Command Input

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-23 | Text input field for sending commands | Must | ✓ |
| FR-24 | Send command on Enter key or Send button | Must | ✓ |
| FR-25 | Command history navigation (up/down arrows) | Must | ✓ |
| FR-26 | Persist command history in localStorage | Should | ✓ |
| FR-27 | Clear input field after sending command | Must | ✓ |
| FR-28 | Disable input when disconnected | Must | ✓ |

### 2.4 Debug Level Control

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-29 | Display current debug level | Must | ✓ |
| FR-30 | Change debug level via buttons (V/D/I/W/E) | Must | ✓ |
| FR-31 | Change debug level via keyboard shortcuts | Must | ✓ |
| FR-32 | Visual indication of active level | Must | ✓ |
| FR-33 | Support all 5 debug levels (Verbose, Debug, Info, Warning, Error) | Must | ✓ |
| FR-34 | Send level change command to device | Must | ✓ |
| FR-35 | Update UI when device reports level change | Must | ✓ |

### 2.5 Device Information

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-36 | Display board type (ESP32/ESP8266) | Must | ✓ |
| FR-37 | Display free memory | Must | ✓ |
| FR-38 | Display RemoteDebug library version | Must | ✓ |
| FR-39 | Parse and display device features | Should | ✓ |
| FR-40 | Update device info from protocol messages | Must | ✓ |

### 2.6 User Interface

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-41 | Responsive layout (desktop, tablet, mobile) | Must | ✓ |
| FR-42 | Adjust console font size (increase/decrease) | Must | ✓ |
| FR-43 | Copy console content to clipboard | Must | ✓ |
| FR-44 | Dark/Light/System theme selection | Must | ✓ |
| FR-45 | Customizable colors per log level | Must | ✓ |
| FR-46 | Settings persistence (localStorage) | Must | ✓ |
| FR-47 | About dialog with version and project info | Should | ✓ |
| FR-48 | Keyboard shortcuts help reference | Should | ✓ |
| FR-49 | Pause/resume console output | Should | ✓ |
| FR-50 | Filter messages by text or level | Should | ✓ |

### 2.7 Keyboard Shortcuts

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-51 | V: Set level to Verbose | Must | ✓ |
| FR-52 | D: Set level to Debug | Must | ✓ |
| FR-53 | I: Set level to Info | Must | ✓ |
| FR-54 | W: Set level to Warning | Must | ✓ |
| FR-55 | E: Set level to Error | Must | ✓ |
| FR-56 | C: Clear console | Should | ✓ |
| FR-57 | P: Pause/resume output | Should | ✓ |
| FR-58 | A: Toggle auto-scroll | Should | ✓ |
| FR-59 | ?: Send help command | Should | ✓ |
| FR-60 | R: Send reset command | Should | ✓ |
| FR-61 | Esc: Close modals/panels | Should | ✓ |

### 2.8 Protocol Handling

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-62 | Parse `$app:I` handshake acknowledgment | Must | ✓ |
| FR-63 | Parse `$app:V` version/device info message | Must | ✓ |
| FR-64 | Parse `$app:L` level change message | Must | ✓ |
| FR-65 | Parse `$app:M` memory message | Must | ✓ |
| FR-66 | Support extensible codec system | Must | ✓ |
| FR-67 | Handle protocol messages vs. regular messages | Must | ✓ |
| FR-68 | Forward unknown commands to device | Must | ✓ |

---

## 3. Non-Functional Requirements

### 3.1 Performance

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-01 | Initial page load time | < 1 second (local) | ✓ |
| NFR-02 | Message render latency | < 16ms (60fps) | ✓ |
| NFR-03 | Handle message rate | > 100 msg/sec | ✓ |
| NFR-04 | Console buffer size | 10,000 messages | ✓ |
| NFR-05 | Memory usage (idle) | < 50 MB | ✓ |
| NFR-06 | Bundle size (gzipped) | < 100 KB | ✓ |
| NFR-07 | Batch rendering interval | 50ms | ✓ |

### 3.2 Compatibility

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-08 | Browser support | Chrome 90+, Firefox 90+, Safari 14+, Edge 90+ | ✓ |
| NFR-09 | Run from `file://` protocol | Must work | ✓ |
| NFR-10 | Run from HTTP server | Must work | ✓ |
| NFR-11 | Run from HTTPS server | Must work (with appropriate WebSocket protocol) | ✓ |
| NFR-12 | Mobile browser support | Responsive, touch-friendly | ✓ |
| NFR-13 | RemoteDebug compatibility | v3.0.0+ | ✓ |

### 3.3 Reliability

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-14 | Connection stability | Stable for extended sessions | ✓ |
| NFR-15 | Error recovery | Graceful handling of all errors | ✓ |
| NFR-16 | Data integrity | No message loss or corruption | ✓ |
| NFR-17 | Graceful degradation | Work with partial protocol support | ✓ |
| NFR-18 | No memory leaks | Stable memory over 8+ hours | ✓ |

### 3.4 Usability

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-19 | Learning curve | Usable within 5 minutes | ✓ |
| NFR-20 | Intuitive UI | Self-explanatory controls | ✓ |
| NFR-21 | Visual feedback | Clear status indicators | ✓ |
| NFR-22 | Error messages | Clear, actionable error messages | ✓ |

### 3.5 Maintainability

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-23 | Code documentation | JSDoc/TSDoc comments | ✓ |
| NFR-24 | Test coverage | > 70% for core services | Partial |
| NFR-25 | Linting | No ESLint errors | ✓ |
| NFR-26 | Type safety | Full TypeScript coverage | ✓ |
| NFR-27 | Dependency count | Minimal runtime dependencies | ✓ |
| NFR-28 | Modular architecture | Clear separation of concerns | ✓ |

### 3.6 Security

| ID | Requirement | Target | Status |
|----|-------------|--------|--------|
| NFR-29 | No external network calls | Works fully offline | ✓ |
| NFR-30 | No data persistence to external servers | All data local | ✓ |
| NFR-31 | XSS prevention | Sanitize displayed messages | ✓ |
| NFR-32 | Content Security Policy | Compatible with strict CSP | ✓ |

---

## 4. Deployment Requirements

### 4.1 Local Usage

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| DR-01 | No build step required for end users | Must | ✓ |
| DR-02 | Works without internet connection | Must | ✓ |
| DR-03 | Distributable as ZIP archive | Must | ✓ |
| DR-04 | Open directly from filesystem | Must | ✓ |

### 4.2 Hosted Usage

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| DR-05 | Deployable to static hosting (GitHub Pages, Netlify) | Must | ✓ |
| DR-06 | No server-side runtime required | Must | ✓ |
| DR-07 | CDN-friendly (cacheable assets) | Should | ✓ |
| DR-08 | Automated deployment via GitHub Actions | Should | ✓ |

---

## 5. Architecture

### 5.1 Core Components

| Component | Responsibility | Implementation |
|-----------|----------------|----------------|
| App | Main application coordinator | `components/App.ts` |
| WebSocketService | WebSocket connection management | `services/WebSocketService.ts` |
| Console | Message display and rendering | `components/Console.ts` |
| CommandInput | User input handling | `components/CommandInput.ts` |
| MessageParser | Protocol message parsing | `services/MessageParser.ts` |
| StorageService | LocalStorage persistence | `services/StorageService.ts` |
| ThemeService | Theme management | `services/ThemeService.ts` |
| FilterBar | Message filtering | `components/FilterBar.ts` |
| SettingsPanel | User preferences | `components/SettingsPanel.ts` |

### 5.2 Codec System

The codec system provides an extensible architecture for supporting different message formats:

| Codec | Purpose | Status |
|-------|---------|--------|
| RemoteDebugCodec | Parse RemoteDebug protocol messages | ✓ Implemented |
| AnsiCodec | Convert ANSI color codes to HTML | ✓ Implemented |
| Custom Codecs | Support for future protocols | Ready for extension |

---

## 6. Constraints

### 6.1 Technical Constraints
- Must communicate with existing RemoteDebug library (no firmware changes required)
- Must be open for new debug libraries (different protocols)
- ESP32/ESP8266 WebSocket servers typically don't support WSS natively
- Browser security blocks mixed content (HTTPS → WS without proxy)
- No server-side processing available in basic deployment

### 6.2 Design Constraints
- Modern, clean interface with dark/light theme support
- Color scheme should provide good contrast and accessibility
- Responsive design for various screen sizes

---

## 7. Testing Requirements

### 7.1 Unit Testing

| Area | Coverage Target | Status |
|------|----------------|--------|
| Services | > 80% | Partial |
| Utilities | > 90% | Partial |
| Components | > 60% | Partial |

### 7.2 Integration Testing

| Test Scenario | Priority | Status |
|---------------|----------|--------|
| WebSocket connection flow | Must | Manual |
| Message parsing accuracy | Must | Manual |
| Command execution | Must | Manual |
| State persistence | Should | Manual |

### 7.3 Protocol Testing

Testing tools available in `tests/` directory:
- `ws-test.cjs` - Automated protocol tests
- `ws-repl.cjs` - Interactive REPL for manual testing

---

## 8. Documentation Requirements

| Document | Status |
|----------|--------|
| README.md | ✓ Complete |
| STATIC_BUILD.md | ✓ Complete |
| GITHUB_PAGES_DEPLOYMENT.md | ✓ Complete |
| Code documentation (JSDoc) | ✓ Mostly complete |
| API documentation | Needed |
| User guide | Needed |

---

## 9. Future Enhancements

### 9.1 Potential Features (Not Currently Required)

- PWA manifest for install prompt
- Service worker for offline caching
- Export console log to file
- Custom command macros/shortcuts
- Session recording and playback
- Multiple device connections
- Plugin system for custom protocols
- Accessibility (WCAG 2.1 AA compliance)
- Internationalization (i18n)

---

## 10. Glossary

| Term | Definition |
|------|------------|
| ESP32/ESP8266 | Espressif microcontrollers with WiFi |
| RemoteDebug | Arduino library for network debugging |
| WebSocket | Full-duplex communication protocol over TCP |
| WSS | WebSocket Secure (over TLS) |
| ANSI codes | Escape sequences for terminal colors |
| Debug Level | Verbosity setting (Verbose/Debug/Info/Warning/Error) |
| Codec | Encoder/decoder for message formats |
| LocalStorage | Browser API for persistent client-side storage |

---

## 11. Acceptance Criteria

### 11.1 Release Readiness

The following must be true for production release:

- [x] All "Must" priority functional requirements implemented
- [x] All "Must" priority non-functional requirements met
- [x] Core documentation complete
- [x] No critical bugs
- [x] Cross-browser testing passed
- [x] Static build works from filesystem
- [x] Can be deployed to GitHub Pages
- [ ] User guide available
- [ ] Automated tests for core functionality


