import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copyIndexHtml() {
  try {
    const distPath = resolve(__dirname, 'dist');
    const publicIndexPath = resolve(__dirname, 'public', 'index.html');
    const distIndexPath = resolve(distPath, 'index.html');
    
    // Ensure the dist directory exists
    await fs.mkdir(distPath, { recursive: true });
    
    // Copy the public/index.html to dist directory
    const publicIndexContent = await fs.readFile(publicIndexPath, 'utf-8');
    await fs.writeFile(distIndexPath, publicIndexContent, 'utf-8');
    
    console.log('Successfully copied public/index.html to dist directory');
  } catch (error) {
    console.error('Error copying index.html:', error);
    // Don't fail the build if this step fails
    process.exit(0);
  }
}

copyIndexHtml(); 