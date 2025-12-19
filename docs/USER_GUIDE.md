# WSTerm User Guide

Welcome to WSTerm - a modern web-based terminal for debugging ESP32 and ESP8266 microcontrollers over WebSocket.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Connecting to Your Device](#connecting-to-your-device)
4. [Using the Console](#using-the-console)
5. [Debug Levels](#debug-levels)
6. [Sending Commands](#sending-commands)
7. [Filtering Messages](#filtering-messages)
8. [Keyboard Shortcuts](#keyboard-shortcuts)
9. [Settings and Customization](#settings-and-customization)
10. [Troubleshooting](#troubleshooting)
11. [Advanced Features](#advanced-features)

---

## Introduction

WSTerm is a lightweight, modern web application designed for real-time debugging of ESP32 and ESP8266 Arduino devices. It provides a console-like interface where you can:

- View real-time debug messages from your device
- Send commands to your device
- Control debug verbosity levels
- Filter and search through messages
- Customize the appearance with themes and color schemes

### Key Features

- **Real-time Communication**: Connect directly to your device via WebSocket
- **Color-Coded Messages**: Debug levels are visually distinguished for easy scanning
- **ANSI Color Support**: Terminal color codes are rendered properly
- **Command History**: Navigate through previously sent commands
- **Message Filtering**: Search and filter messages by text or debug level
- **Theme Support**: Dark, light, and system themes available
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **No Installation Required**: Runs directly in your browser
- **Offline Capable**: Works without internet connection

---

## Getting Started

### Prerequisites

- A web browser (Chrome 90+, Firefox 90+, Safari 14+, or Edge 90+)
- An ESP32 or ESP8266 device running the RemoteDebug library (v4.0.0+)
- Your device and computer connected to the same network

### Opening WSTerm

You can use WSTerm in three ways:

#### Option 1: Online (Hosted Version)
Visit the hosted version at: [your-hosted-url]

#### Option 2: Download Pre-built Release
1. Download the latest release from the [Releases page](https://github.com/[your-repo]/releases)
   - **Single-file version**: `wsterm-inline.html` - Just one HTML file! ✨
   - **Multi-file version**: `wsterm-static.zip` - Extract and use
2. **For single-file version:**
   - Just open `wsterm-inline.html` in any browser (Chrome, Firefox, Edge, Safari)
   - Works directly - no extraction, no server needed!
3. **For multi-file version:**
   - Extract the ZIP file
   - Open `index.html` with Firefox OR use a local server (see Option 4)

> **💡 Tip:** The single-file version is easiest - it works in all browsers including Chrome/Edge without any server!

#### Option 3: Build from Source
If you want to build from source code:
1. Clone the repository: `git clone [repo-url]`
2. Install dependencies: `npm install`
3. Build the application: `npm run build`
4. The built files will be in the `dist/` folder
5. Open `dist/index.html` in your browser

#### Option 4: Run with Node.js Server (For Development)
If you have Node.js installed and want to serve the app via HTTP:

**Using Vite's Built-in Preview Server:**
```bash
# Clone and setup
git clone [repo-url]
cd websocket-remote-debug
npm install

# Build the application
npm run build

# Start the preview server
npm run preview
```

The application will be available at `http://localhost:4173`



> **Note**: WSTerm works entirely in your browser - no server installation needed for end users! The server only serves static files.

---

## Connecting to Your Device

### Step 1: Prepare Your Device

Ensure your ESP32/ESP8266 device is:
- Running firmware with RemoteDebug library
- Connected to WiFi
- WebSocket server is running (default port: 8232)
- You know the device's IP address

### Step 2: Enter Connection Details

1. Look for the connection input field at the top of WSTerm
2. Enter your device's IP address or hostname
   - Example: `192.168.1.100`
   - Example: `esp32-device.local`
3. The default port (8232) will be used automatically
4. Press Enter or click the Connect button

### Step 3: Connection Status

Watch the status indicator:
- **Disconnected** (Gray): Not connected
- **Connecting** (Yellow): Attempting to connect
- **Connected** (Green): Successfully connected
- **Error** (Red): Connection failed

### Connection Tips

- **Finding your device's IP**: Check your router's DHCP client list or the device's serial output
- **Port configuration**: The default WebSocket port is 8232
- **Protocol**: Use `ws://` for unencrypted connections (typical for ESP devices)
- **Last address saved**: WSTerm remembers your last connection address

---

## Using the Console

### Message Display

The console shows all messages received from your device:

- **System messages** (starting with `*`): Displayed in a distinct style
- **Debug messages**: Color-coded by level (Verbose/Debug/Info/Warning/Error)
- **Profiler messages**: Show timing information with color-coded indicators
- **Regular output**: Any other text from your device

### Message Format

Each message can include:
- **Timestamp**: Time since device boot (in milliseconds)
- **Clock time**: Actual time (if available)
- **Debug level**: V/D/I/W/E indicator
- **Message content**: The actual debug message

### Console Controls

Located in the toolbar:

- **Clear (🗑️)**: Remove all messages from the console
- **Copy**: Copy all console content to clipboard
- **Pause/Resume**: Freeze or resume message display
- **Auto-scroll toggle**: Enable/disable automatic scrolling to latest message
- **Font size (+/-)**: Increase or decrease console text size

### Scrolling

- **Auto-scroll**: When enabled, console automatically scrolls to newest messages
- **Manual scroll**: Scroll up to view message history (auto-scroll temporarily pauses)
- **Return to bottom**: Scroll to the bottom or toggle auto-scroll on to resume

---

## Debug Levels

WSTerm supports five debug levels, matching the RemoteDebug library:

### Level Descriptions

| Level | Short | Color | Purpose |
|-------|-------|-------|---------|
| **Verbose** | V | Gray | Detailed diagnostic information |
| **Debug** | D | Cyan | General debugging messages |
| **Info** | I | Green | Informational messages |
| **Warning** | W | Yellow | Warning conditions |
| **Error** | E | Red | Error conditions |

### Changing Debug Level

You can change the device's debug level in three ways:

#### 1. Level Buttons
Click the V/D/I/W/E buttons in the toolbar

#### 2. Keyboard Shortcuts
Press the corresponding key:
- `V` - Verbose
- `D` - Debug
- `I` - Info
- `W` - Warning
- `E` - Error

#### 3. Command Input
Type: `$app:L[level]` (e.g., `$app:LD` for Debug)

### Active Level Indication

The currently active debug level is highlighted in the toolbar. Only messages at or above this level are shown on the device.

---

## Sending Commands

### Command Input Field

Located at the bottom of the screen:

1. Click in the input field (or press any key when console is focused)
2. Type your command
3. Press **Enter** to send

### Command Types

#### Standard Commands
Any text you type is sent directly to your device:
```
help          - Request help from device
reset         - Reset the device
m             - Show memory usage
?             - Show debug commands
```

#### Protocol Commands
Special commands starting with `$app:`:
```
$app          - Initial handshake
$app:LV       - Set level to Verbose
$app:LD       - Set level to Debug
$app:LI       - Set level to Info
$app:LW       - Set level to Warning
$app:LE       - Set level to Error
```

### Command History

Navigate through previously sent commands:
- **Up Arrow** (↑): Previous command
- **Down Arrow** (↓): Next command

Your command history is saved and persists between sessions.

### Input State

- **Enabled** (white/light background): Connected, ready for input
- **Disabled** (gray background): Disconnected, input blocked

---

## Filtering Messages

### Filter Bar

Open the filter bar using the **Filter** button in the toolbar or press `Ctrl+F`.

### Filter Options

#### Text Search
- Enter text in the filter field
- Messages are filtered in real-time
- Case-insensitive search
- Matches message content

#### Level Filter
Filter by debug level:
- Check/uncheck level checkboxes (V/D/I/W/E)
- Only selected levels are displayed
- Multiple levels can be active simultaneously

### Filter Behavior

- **Active filters**: Console shows only matching messages
- **Clear filter**: Click the × button or clear all checkboxes
- **Performance**: Filtering is fast even with thousands of messages

---

## Keyboard Shortcuts

### Debug Level Control
| Key | Action |
|-----|--------|
| `V` | Set debug level to Verbose |
| `D` | Set debug level to Debug |
| `I` | Set debug level to Info |
| `W` | Set debug level to Warning |
| `E` | Set debug level to Error |

### Console Control
| Key | Action |
|-----|--------|
| `C` | Clear console |
| `P` | Pause/Resume console output |
| `A` | Toggle auto-scroll |

### Commands
| Key | Action |
|-----|--------|
| `?` | Send help command |
| `R` | Send reset command |
| `Enter` | Send current command |
| `↑` | Previous command in history |
| `↓` | Next command in history |

### Interface
| Key | Action |
|-----|--------|
| `Esc` | Close modals and panels |
| `Ctrl+F` | Open filter bar |

> **Note**: Keyboard shortcuts work when the console or input field has focus. They won't interfere while typing in input fields.

---

## Settings and Customization

### Opening Settings

Click the **Settings** (⚙️) button in the toolbar to open the settings panel.

### Theme Settings

Choose your preferred color scheme:

- **System**: Follows your operating system's theme
- **Light**: Light background with dark text
- **Dark**: Dark background with light text

### Display Settings

#### Console Font Size
- Use +/- buttons in toolbar
- Or adjust slider in settings
- Persists between sessions

#### Message Format
Choose how timestamps are displayed:
- **Timestamp**: Milliseconds since boot (default)
- **Clock Time**: Actual time (if device provides it)
- **Minimal**: No timestamp, just level and message

### Color Customization

Customize colors for each debug level:

1. Open Settings
2. Find the color pickers for each level
3. Click to choose custom colors
4. Changes apply immediately

**Default Colors:**
- Verbose: Gray (#9E9E9E)
- Debug: Cyan (#00BCD4)
- Info: Green (#4CAF50)
- Warning: Yellow (#FFC107)
- Error: Red (#F44336)

### Auto-Scroll Settings

- Toggle auto-scroll on/off
- Automatically scrolls to newest messages when enabled
- Temporarily pauses when you manually scroll up

### Settings Persistence

All your settings are automatically saved in your browser's local storage and restored when you reopen WSTerm.

---

## Troubleshooting

### Connection Issues

#### "Connection Failed" Error

**Possible Causes:**
- Device is not on the network
- Wrong IP address or port
- Firewall blocking connection
- Device WebSocket server not running

**Solutions:**
1. Verify device IP address (check router or serial monitor)
2. Ensure device is connected to WiFi
3. Try pinging the device: `ping [device-ip]`
4. Check that RemoteDebug is initialized in your device firmware
5. Verify the port number (default: 8232)

#### "WebSocket Connection Closed Unexpectedly"

**Possible Causes:**
- Device rebooted or crashed
- Network connection lost
- WiFi signal too weak

**Solutions:**
1. Check device status (serial monitor)
2. Verify WiFi signal strength
3. Try reconnecting
4. Check device power supply

#### "Mixed Content" Error (HTTPS to WS)

**Cause:**
Browsers block insecure WebSocket (ws://) connections from secure pages (https://)

**Solutions:**
- Use HTTP version of WSTerm (not HTTPS)
- Or use local file:// version
- Or set up WSS (WebSocket Secure) on your device (advanced)

### Display Issues

#### Messages Not Appearing

**Check:**
- Connection status is "Connected"
- Console is not paused
- Filters are not hiding messages
- Debug level on device allows these messages

**Try:**
- Clear any active filters
- Resume console if paused
- Change debug level to Verbose

#### Console Not Auto-Scrolling

**Check:**
- Auto-scroll toggle is enabled
- You haven't manually scrolled up recently

**Try:**
- Click the auto-scroll toggle in toolbar
- Scroll to the bottom manually
- Press `A` key to toggle auto-scroll

#### Colors Not Showing

**Check:**
- Theme settings
- Custom colors in settings
- Browser compatibility

**Try:**
- Reset colors to defaults in settings
- Try a different browser
- Check for browser extensions interfering with styles

### Performance Issues

#### Console Slow or Laggy

**Possible Causes:**
- Too many messages in buffer
- Very high message rate (>100/sec)
- Old/slow device or browser

**Solutions:**
1. Clear console periodically (press `C`)
2. Use message filtering to reduce display
3. Pause console when not actively monitoring
4. Close other browser tabs
5. Update to a modern browser

#### High Memory Usage

**Cause:**
Console buffer holding too many messages

**Solution:**
Clear console regularly - buffer is limited to 10,000 messages automatically

### Device Issues

#### Device Not Responding to Commands

**Check:**
- Connection status is "Connected"
- Device firmware implements command handling
- RemoteDebug is properly configured

**Try:**
- Send `?` to see available commands
- Check device serial output for errors
- Verify RemoteDebug initialization in firmware

#### Garbled or Strange Characters

**Possible Causes:**
- Encoding mismatch
- Binary data being sent
- Corrupted transmission

**Solutions:**
- Check device firmware for proper string encoding (UTF-8)
- Ensure device sends text, not binary
- Try reconnecting

---

## Advanced Features

### ANSI Color Codes

WSTerm automatically renders ANSI escape sequences for colors and styles:

- **Foreground colors**: 30-37, 90-97
- **Background colors**: 40-47, 100-107
- **Styles**: Bold, italic, underline
- **Reset**: Clear all formatting

Your device can send ANSI codes for rich console output.

### Profiler Messages

When device sends profiler timing data:
- Displayed with timing indicators
- Color-coded by performance:
  - Green: Fast (< 10ms)
  - Yellow: Moderate (10-100ms)
  - Red: Slow (> 100ms)

### Device Information Display

WSTerm shows device information in the status bar:
- **Board Type**: ESP32 or ESP8266
- **Free Memory**: Available heap memory
- **Library Version**: RemoteDebug library version
- **Features**: Device capabilities

Information updates automatically from device messages.

### Protocol Extensions

WSTerm uses an extensible codec system that can support:
- RemoteDebug protocol (built-in)
- ANSI color codes (built-in)
- Custom protocols (via codec plugins)

This allows WSTerm to work with different debugging libraries and protocols.

### Export Console Log

**Manual Export:**
1. Click Copy button in toolbar
2. Paste into text editor
3. Save to file

**Format:**
- Plain text
- Includes all visible console content
- Preserves message order
- No formatting codes

### Session Persistence

WSTerm automatically saves:
- Last connected address
- Command history (last 50 commands)
- Settings and preferences
- Theme selection

All data is stored locally in your browser (localStorage) - nothing is sent to external servers.

---

## Tips and Best Practices

### Efficient Debugging

1. **Use appropriate debug levels**: Don't leave device on Verbose in production
2. **Clear console regularly**: Keeps interface responsive
3. **Use filters**: Focus on specific message types
4. **Pause when needed**: Stop flow to analyze messages
5. **Command history**: Reuse common commands quickly

### Network Considerations

1. **Stable WiFi**: Ensure good signal strength
2. **Same network**: Device and computer should be on same network
3. **Static IP**: Consider assigning static IP to device for consistent address
4. **mDNS**: Use .local hostnames if your network supports it

### Performance Optimization

1. **Limit message rate**: On device, throttle high-frequency messages
2. **Use conditional debugging**: Only send messages when needed
3. **Clear console**: Don't let thousands of messages accumulate
4. **Close unused tabs**: Free up browser resources

### Security Notes

- WSTerm runs entirely in your browser - no data sent to external servers
- Works offline after initial load
- All data stored locally in browser
- WebSocket connections are typically unencrypted (ws://)
- For sensitive data, ensure your network is secure or use WSS

---

## Frequently Asked Questions

### Can I connect to multiple devices?

Currently, WSTerm supports one device connection at a time. Multiple device support is planned for a future release.

### Does WSTerm work on mobile devices?

Yes! WSTerm is fully responsive and works on tablets and smartphones. The interface adapts to smaller screens.

### Can I save console output to a file?

You can copy the console content to clipboard and paste into a text editor. Automatic log export is planned for a future release.

### What's the maximum number of messages in the console?

The console buffer is limited to 10,000 messages for performance and memory management. Older messages are automatically removed.

### Can I use WSTerm with other microcontrollers?

WSTerm is designed for ESP32/ESP8266 with RemoteDebug library, but its codec system can be extended to support other protocols and devices.

### Is internet required?

No! WSTerm works completely offline after initial load. Your device and computer only need to be on the same local network.

### Can I customize keyboard shortcuts?

Custom keyboard shortcuts are not currently supported but may be added in a future release.

### Does WSTerm work with ESP-IDF?

WSTerm is designed for Arduino + RemoteDebug library. For ESP-IDF, you'd need to implement a compatible WebSocket protocol or use the RemoteDebug library in your ESP-IDF project.

---

## Getting Help

### Additional Resources

- **Project Repository**: [GitHub URL]
- **Issue Tracker**: Report bugs or request features
- **RemoteDebug Library**: [Arduino library documentation]
- **Community Forum**: [Link if available]

### Reporting Issues

When reporting issues, please include:
1. WSTerm version
2. Browser and version
3. Device type (ESP32/ESP8266)
4. RemoteDebug library version
5. Steps to reproduce
6. Console error messages (if any)

### Contributing

WSTerm is open source! Contributions are welcome:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## Appendix

### Browser Compatibility

| Browser | Minimum Version | Status |
|---------|----------------|--------|
| Chrome | 90+ | ✓ Fully supported |
| Firefox | 90+ | ✓ Fully supported |
| Safari | 14+ | ✓ Fully supported |
| Edge | 90+ | ✓ Fully supported |
| Opera | 76+ | ✓ Should work |
| Brave | 90+ | ✓ Should work |

### WebSocket Protocol Details

**Connection:**
- Protocol: WebSocket (RFC 6455)
- Subprotocol: `arduino`
- Default port: 8232
- Scheme: `ws://` (or `wss://` for secure)

**Handshake:**
1. Client connects to `ws://[device-ip]:8232`
2. Client sends: `$app`
3. Server responds: `$app:I` (initialized)
4. Server sends: `$app:V` (version info)

**Message Format:**
- Text-based protocol
- Protocol messages start with `$app:`
- Regular messages are debug output
- Commands sent as plain text

### Default Settings

```
Connection:
  Port: 8232
  Protocol: ws://
  Auto-connect: false

Console:
  Max messages: 10,000
  Batch interval: 50ms
  Auto-scroll: true
  Font size: 14px

Theme:
  Mode: system
  
Colors:
  Verbose: #9E9E9E
  Debug: #00BCD4
  Info: #4CAF50
  Warning: #FFC107
  Error: #F44336
```

---

## License

WSTerm is open source software. See LICENSE file for details.

---

**Version**: 1.0.0  
**Last Updated**: December 2025

---

*Thank you for using WSTerm! Happy debugging! 🚀*
