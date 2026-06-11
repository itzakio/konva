'use client';

import { Stage, Layer } from 'react-konva';
import { useStands } from '@/features/stands/hooks/useStands';
import { Stand as StandComponent } from './Stand';
import { useMapControls } from '@/hooks/useMapControls';
import { useStandSelection } from '@/features/stands/hooks/useStandSelection';

interface ExhibitionMapProps {
  highlightedStandId?: string | null;
  onStandClick?: (standId: string) => void;
}

export const ExhibitionMap = ({ highlightedStandId, onStandClick }: ExhibitionMapProps) => {
  const { data: stands, isLoading } = useStands();
  const { stageRef, scale, position, handleWheel, handleDragMove, zoomIn, zoomOut } = useMapControls();
  const { selectedStandId, selectStand } = useStandSelection();

  if (isLoading) return <div className="flex items-center justify-center h-full">Loading map...</div>;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight - 64} // adjust for header
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
            <StandComponent
              key={stand.id}
              stand={stand}
              isSelected={selectedStandId === stand.id}
              isHighlighted={highlightedStandId === stand.id}
              onClick={() => {
                selectStand(stand.id);
                onStandClick?.(stand.id);
              }}
            />
          ))}
        </Layer>
      </Stage>
      <div className="absolute bottom-4 right-4 flex gap-2 z-10">
        <button onClick={zoomIn} className="bg-white p-2 rounded shadow">+</button>
        <button onClick={zoomOut} className="bg-white p-2 rounded shadow">-</button>
      </div>
    </div>
  );
};