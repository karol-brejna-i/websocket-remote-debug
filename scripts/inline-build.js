#!/usr/bin/env node

/**
 * Inline Build Script
 * 
 * Creates a single-file HTML with all CSS and JavaScript inlined.
 * This allows the app to work with file:// protocol in Chrome/Edge.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const inlinedPath = path.join(distDir, 'index-inline.html');

console.log('Creating single-file HTML build...\n');

// Helper function to convert file to base64 data URI
function fileToDataUri(filePath, mimeType) {
  const fileContent = fs.readFileSync(filePath);
  const base64 = fileContent.toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

// Helper function to get MIME type from file extension
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// Read the HTML file
let html = fs.readFileSync(indexPath, 'utf-8');

// Find and inline image/icon files (favicon, etc.)
const iconRegex = /<link[^>]+rel="icon"[^>]+href="([^"]+)"/g;
let iconMatch;
while ((iconMatch = iconRegex.exec(html)) !== null) {
  const iconFile = iconMatch[1].replace('./', '');
  const iconPath = path.join(distDir, iconFile);
  
  if (fs.existsSync(iconPath)) {
    console.log(`Inlining icon: ${iconFile}`);
    const mimeType = getMimeType(iconPath);
    const dataUri = fileToDataUri(iconPath, mimeType);
    html = html.replace(iconMatch[1], dataUri);
  }
}

// Find and inline CSS files
const cssRegex = /<link[^>]+href="([^"]+\.css)"[^>]*>/g;
let cssMatch;
while ((cssMatch = cssRegex.exec(html)) !== null) {
  const cssFile = cssMatch[1].replace('./', '');
  const cssPath = path.join(distDir, cssFile);
  
  if (fs.existsSync(cssPath)) {
    console.log(`Inlining CSS: ${cssFile}`);
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    const inlinedCss = `<style>${cssContent}</style>`;
    html = html.replace(cssMatch[0], inlinedCss);
  }
}

// Find and inline JavaScript files
const jsRegex = /<script[^>]+src="([^"]+\.js)"[^>]*><\/script>/g;
let jsMatch;
while ((jsMatch = jsRegex.exec(html)) !== null) {
  const jsFile = jsMatch[1].replace('./', '');
  const jsPath = path.join(distDir, jsFile);
  
  if (fs.existsSync(jsPath)) {
    console.log(`Inlining JS: ${jsFile}`);
    let jsContent = fs.readFileSync(jsPath, 'utf-8');
    
    // Remove 'crossorigin' and 'type="module"' for inlined script
    const scriptTag = jsMatch[0].replace(/\s*crossorigin\s*/g, '').replace(/src="[^"]*"/, '');
    const inlinedJs = scriptTag.replace('></', `>${jsContent}</`);
    html = html.replace(jsMatch[0], inlinedJs);
  }
}

// Write the inlined version
fs.writeFileSync(inlinedPath, html, 'utf-8');

console.log(`\n✅ Single-file build created: ${inlinedPath}`);
console.log(`   Original size: ${(fs.statSync(indexPath).size / 1024).toFixed(2)} KB`);
console.log(`   Inlined size:  ${(fs.statSync(inlinedPath).size / 1024).toFixed(2)} KB`);
console.log('\nThis file can be opened directly with file:// protocol in any browser!');
