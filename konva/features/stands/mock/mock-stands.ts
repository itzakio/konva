import { Stand } from '../types/stand.types';
import { siteConfig } from '@/config/site';

const { rows, cols, standWidth, standHeight, gap, startX, startY } = siteConfig.map.grid;

export const generateMockStands = (): Stand[] => {
  const stands: Stand[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const id = `stand-${row}-${col}`;
      const standNo = `${String.fromCharCode(65 + row)}${col + 1}`;
      const rand = Math.random();
      const status: Stand['status'] = rand < 0.6 ? 'available' : rand < 0.8 ? 'reserved' : 'booked';
      stands.push({
        id,
        standNo,
        x: startX + col * (standWidth + gap),
        y: startY + row * (standHeight + gap),
        width: standWidth,
        height: standHeight,
        status,
        price: Math.floor(Math.random() * 5000) + 1000,
        category: row < 3 ? 'premium' : 'standard',
      });
    }
  }
  return stands;
};

export const mockStands = generateMockStands();