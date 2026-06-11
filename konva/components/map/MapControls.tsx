'use client';

import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react'; // optional: install lucide-react

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  className?: string;
}

export const MapControls = ({ onZoomIn, onZoomOut, className = '' }: MapControlsProps) => {
  return (
    <div className={`absolute bottom-4 right-4 flex flex-col gap-2 z-10 ${className}`}>
      <Button
        onClick={onZoomIn}
        variant="secondary"
        size="icon"
        className="shadow-lg bg-white hover:bg-gray-100 rounded-full w-10 h-10"
      >
        <ZoomIn size={20} />
      </Button>
      <Button
        onClick={onZoomOut}
        variant="secondary"
        size="icon"
        className="shadow-lg bg-white hover:bg-gray-100 rounded-full w-10 h-10"
      >
        <ZoomOut size={20} />
      </Button>
    </div>
  );
};