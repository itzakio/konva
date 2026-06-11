export const siteConfig = {
  name: 'Exhibition Booking System',
  description: 'Interactive exhibition stand booking platform',
  map: {
    defaultScale: 1,
    defaultPosition: { x: 0, y: 0 },
    minScale: 0.3,
    maxScale: 3,
    grid: {
      rows: 12,
      cols: 12,
      standWidth: 80,
      standHeight: 80,
      gap: 20,
      startX: 50,
      startY: 50,
    },
  },
  statusColors: {
    available: '#22c55e',
    reserved: '#eab308',
    booked: '#ef4444',
  },
} as const;