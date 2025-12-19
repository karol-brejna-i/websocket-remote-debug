# Single-File Build

WSTerm can be built as a **single HTML file** that works with `file://` protocol in ALL browsers (Chrome, Edge, Firefox, Safari).

## Why?

Modern browsers (especially Chrome and Edge) block loading external CSS/JavaScript files from `file://` protocol due to CORS security policies. This prevents the standard Vite build from working when opened directly.

The single-file build solves this by **inlining all CSS and JavaScript** directly into the HTML file, eliminating external dependencies.

## Creating the Single-File Build

```bash
npm run build:inline
```

This will create `dist/index-inline.html` - a completely self-contained HTML file.

## Usage

Users can simply:
1. Download `index-inline.html`
2. Double-click to open in any browser
3. Start debugging!

No extraction, no web server, no configuration needed.

## File Size

The single-file version is larger than the multi-file build (typically ~300-500KB) but still very reasonable for distribution.

## Distribution

Perfect for:
- Email attachments
- USB drives / offline distribution
- Corporate environments with restricted internet
- Quick demos
- Simple file sharing

## Comparison

| Feature | Standard Build | Inline Build |
|---------|---------------|--------------|
| File count | Multiple (HTML + CSS + JS) | Single HTML file |
| Works with Chrome file:// | ❌ No (CORS error) | ✅ Yes |
| Works with Firefox file:// | ✅ Yes | ✅ Yes |
| File size | Smaller (~200KB total) | Larger (~400KB single file) |
| Web server required | Only for Chrome/Edge | Never |
| Best for | Web hosting | Offline distribution |

## Technical Details

The inline build script (`scripts/inline-build.js`) processes the standard Vite build output and:
1. Reads `dist/index.html`
2. Finds all `<link>` tags pointing to CSS files
3. Replaces them with `<style>` tags containing the CSS
4. Finds all `<script src="">` tags pointing to JS files
5. Replaces them with inline `<script>` tags
6. Writes the result to `dist/index-inline.html`

This ensures no external file references remain, eliminating CORS issues.
