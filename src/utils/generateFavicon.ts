
/**
 * This utility is for development purposes.
 * It generates favicon files from the app icon.
 * Run this script once to generate the favicon files.
 */

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

const sizes = [16, 32, 48, 64, 96, 128, 192, 256, 512];
const outputDir = path.join(__dirname, '../../public');

async function generateFavicons() {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate icons for each size
  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Fill background
    ctx.fillStyle = '#7c3aed'; // Primary color
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw weight icon (simplified for canvas)
    ctx.fillStyle = '#ffffff';
    const iconSize = size * 0.6;
    const x = (size - iconSize) / 2;
    const y = (size - iconSize) / 2;
    
    // Draw a dumbbell shape
    const barWidth = iconSize * 0.2;
    const barHeight = iconSize * 0.6;
    const weightSize = iconSize * 0.3;
    
    // Draw the bar
    ctx.fillRect(
      x + (iconSize - barWidth) / 2,
      y + (iconSize - barHeight) / 2,
      barWidth,
      barHeight
    );
    
    // Draw the weights
    ctx.beginPath();
    ctx.arc(
      x + iconSize / 2,
      y + iconSize * 0.25,
      weightSize / 2,
      0,
      Math.PI * 2
    );
    ctx.arc(
      x + iconSize / 2,
      y + iconSize * 0.75,
      weightSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Save as PNG
    const fileName = size === 512 ? 'logo-512.png' : size === 192 ? 'logo.png' : `favicon-${size}.png`;
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(outputDir, fileName), buffer);
    
    // Generate custom-favicon.ico (instead of directly overwriting favicon.ico)
    if (size === 32) {
      fs.copyFileSync(path.join(outputDir, `favicon-${size}.png`), path.join(outputDir, 'custom-favicon.ico'));
    }
  }
  
  console.log('Favicon files generated successfully!');
}

// Run the function if this file is executed directly
if (require.main === module) {
  generateFavicons().catch(console.error);
}
