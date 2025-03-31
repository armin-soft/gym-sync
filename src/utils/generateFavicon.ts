
/**
 * This utility is for development purposes.
 * It generates favicon files from the app icon.
 * Run this script once to generate the favicon files.
 */

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const sizes = [16, 32, 48, 64, 96, 128, 192, 256, 512];
const outputDir = path.join(__dirname, '../../public/Assets/Image');

async function generateFavicons() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate icons for each size
  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Fill background with gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#7c3aed'); // Purple
    gradient.addColorStop(1, '#4f46e5'); // Indigo
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw stylized GS letters for Gym Sync
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size * 0.4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GS', size / 2, size / 2);
    
    // Add a circular border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = size * 0.05;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.42, 0, Math.PI * 2);
    ctx.stroke();
    
    // Save as PNG with capitalized filenames and Custom- prefix
    const fileName = size === 512 ? 'Custom-Logo-512.png' : size === 192 ? 'Custom-Logo.png' : `Custom-Favicon-${size}.png`;
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, fileName), buffer);
    
    // Generate custom-favicon.ico (instead of directly overwriting favicon.ico)
    if (size === 32) {
      fs.copyFileSync(path.join(outputDir, `Custom-Favicon-${size}.png`), path.join(outputDir, 'Custom-Favicon.ico'));
    }
  }
  
  console.log('Custom favicon files generated successfully!');
}

// Run the function if this file is executed directly
if (require.main === module) {
  generateFavicons().catch(console.error);
}
