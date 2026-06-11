export type StandStatus = 'available' | 'reserved' | 'booked';

export interface Stand {
  id: string;
  standNo: string;
  x: number;
  y: number;
  width: number;
  height: number;
  status: StandStatus;
  price: number;      // in dollars (or cents if you prefer)
  category: string;
}