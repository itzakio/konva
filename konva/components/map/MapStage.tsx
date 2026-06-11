'use client';

import { Stage, Layer } from 'react-konva';
import { useMapControls } from '@/hooks/useMapControls';
import { MapControls } from './MapControls';
import { Stand } from './Stand';
import { useStands } from '@/features/stands/hooks/useStands';
import { useEffect, useState } from 'react';

interface MapStageProps {
  highlightedStandId?: string | null;
  selectedStandId?: string | null;
  onStandClick: (standId: string) => void;
}

export const MapStage = ({ highlightedStandId, selectedStandId, onStandClick }: MapStageProps) => {
  const { data: stands, isLoading } = useStands();
  const { stageRef, scale, position, handleWheel, handleDragMove, zoomIn, zoomOut } = useMapControls();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 64, // adjust for header if any
      });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (isLoading) return <div className="flex items-center justify-center h-full">Loading map...</div>;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={dimensions.height}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
        onWheel={handleWheel}
        onDragMove={handleDragMove}
        draggable
        style={{ backgroundColor: '#f3f4f6' }}
      >
        <Layer>
          {stands?.map((stand) => (
            <Stand
              key={stand.id}
              stand={stand}
              isSelected={selectedStandId === stand.id}
              isHighlighted={highlightedStandId === stand.id}
              onClick={() => onStandClick(stand.id)}
            />
          ))}
        </Layer>
      </Stage>
      <MapControls onZoomIn={zoomIn} onZoomOut={zoomOut} />
    </div>
  );
};