import { promises as fs } from 'fs';
import path from 'path';

async function copyIndexHtml() {
  try {
    // Ensure the dist directory exists
    await fs.mkdir('dist', { recursive: true });
    
    // Copy the public/index.html to dist directory
    const publicIndexContent = await fs.readFile('public/index.html', 'utf-8');
    await fs.writeFile('dist/index.html', publicIndexContent, 'utf-8');
    
    console.log('Successfully copied public/index.html to dist directory');
  } catch (error) {
    console.error('Error copying index.html:', error);
  }
}

copyIndexHtml(); 