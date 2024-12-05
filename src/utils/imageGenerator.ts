import { GeneratedPost } from '../types';

const CANVAS_SIZE = 1080;
const PADDING = 80;
const MAX_WIDTH = CANVAS_SIZE - (PADDING * 2) - 140;

const calculateFontSize = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number, startSize: number): number => {
  let fontSize = startSize;
  ctx.font = `bold ${fontSize}px "Work Sans"`;
  let width = ctx.measureText(text).width;
  
  while (width > maxWidth && fontSize > 32) {
    fontSize -= 2;
    ctx.font = `bold ${fontSize}px "Work Sans"`;
    width = ctx.measureText(text).width;
  }
  
  return fontSize;
};

const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number): number => {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY;
};

export const generateImage = async (post: GeneratedPost): Promise<string> => {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Set gradient background
  const gradient = ctx.createLinearGradient(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  gradient.addColorStop(0, '#0A66C2');
  gradient.addColorStop(1, '#0077B5');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Add subtle pattern overlay
  for (let i = 0; i < CANVAS_SIZE; i += 20) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, CANVAS_SIZE);
    ctx.stroke();
  }

  // Draw white container with rounded corners
  const containerWidth = CANVAS_SIZE - (PADDING * 2);
  const containerHeight = CANVAS_SIZE - (PADDING * 2);
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(PADDING, PADDING, containerWidth, containerHeight, 24);
  ctx.fill();
  ctx.restore();

  // Get the main text and insight
  const mainText = post.subject.text; // Enhanced text is stored here
  const insightText = `${post.insight.emoji} ${post.insight.text}`;
  
  // Set up text properties
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  const centerX = CANVAS_SIZE / 2;

  // Calculate and set font size for main text
  const fontSize = calculateFontSize(ctx, mainText, MAX_WIDTH, 56);
  ctx.font = `bold ${fontSize}px "Work Sans"`;
  ctx.fillStyle = '#1B1F23';

  // Draw main text with wrapping
  let currentY = CANVAS_SIZE / 2 - 100;
  currentY = wrapText(ctx, mainText, centerX, currentY, MAX_WIDTH, fontSize + 15);

  // Draw insight with emoji
  if (insightText) {
    const insightFontSize = calculateFontSize(ctx, insightText, MAX_WIDTH, 46);
    ctx.font = `bold ${insightFontSize}px "Work Sans"`;
    ctx.fillStyle = '#0A66C2';
    ctx.fillText(insightText, centerX, currentY + 80);
  }

  // Draw divider line
  ctx.strokeStyle = '#0A66C2';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX - 80, CANVAS_SIZE - PADDING - 80);
  ctx.lineTo(centerX + 80, CANVAS_SIZE - PADDING - 80);
  ctx.stroke();

  // Draw website URL
  ctx.font = 'bold 32px "Work Sans"';
  ctx.fillStyle = '#0A66C2';
  ctx.fillText('comamdneskadatnalinkedin.cz', centerX, CANVAS_SIZE - PADDING - 40);

  return canvas.toDataURL('image/png');
}; 