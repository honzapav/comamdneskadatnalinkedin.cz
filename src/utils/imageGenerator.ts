import { GeneratedPost } from '../types';

const CANVAS_SIZE = 1080;
const PADDING = 80;

export const generateImage = async (post: GeneratedPost): Promise<string> => {
  // Create canvas
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

  // Format and measure text
  const { mainText, insightText } = formatPostForCanvas(post);
  const mainLines = mainText.split('\n').filter(line => line.trim());
  
  // Calculate text positioning
  const totalTextHeight = mainLines.length * 80;
  let startY = (CANVAS_SIZE - totalTextHeight) / 2 - 80;

  // Draw main text
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  const centerX = CANVAS_SIZE / 2;

  // Draw each line
  mainLines.forEach((line) => {
    if (line.trim()) {
      const fontSize = line.length > 35 ? 48 : 56;
      ctx.font = `bold ${fontSize}px "Work Sans"`;
      ctx.fillStyle = '#1B1F23';
      
      const words = line.split(' ');
      let currentLine = words[0];
      const maxWidth = containerWidth - 140;

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
          currentLine += ' ' + word;
        } else {
          ctx.fillText(currentLine, centerX, startY);
          startY += fontSize + 15;
          currentLine = word;
        }
      }
      ctx.fillText(currentLine, centerX, startY);
      startY += fontSize + 30;
    }
  });

  // Draw insight with emoji
  if (insightText) {
    ctx.font = 'bold 46px "Work Sans"';
    ctx.fillStyle = '#0A66C2';
    ctx.fillText(insightText, centerX, startY + 30);
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

const formatPostForCanvas = (post: GeneratedPost): { mainText: string; insightText: string } => {
  // Helper function to combine emoji and text
  const combineEmojiAndText = (emoji: string | undefined, text: string) => {
    return emoji && emoji.trim() ? `${emoji} ${text}` : text;
  };

  // Format main text parts and combine them
  const mainText = [
    combineEmojiAndText(post.subject.emoji, post.subject.text),
    post.context.text,
    post.achievement.text,
    `v oblasti${post.technology.text ? ` ${post.technology.text}` : ''}!`
  ]
    .filter(text => text && text.trim())
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  
  // Format insight text
  const insightText = combineEmojiAndText(post.insight.emoji, post.insight.text)
    .replace(/\s{2,}/g, ' ')
    .trim();
  
  return { mainText, insightText };
}; 