import { Rect, Text, Group } from 'react-konva';
import { Stand as StandType } from '@/features/stands/types/stand.types';
import { memo, useState } from 'react';

const statusColorMap: Record<StandType['status'], string> = {
  available: '#22c55e', // green-500
  reserved: '#eab308',   // yellow-500
  booked: '#ef4444',     // red-500
};

interface StandProps {
  stand: StandType;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: () => void;
}

export const Stand = memo(({ stand, isSelected, isHighlighted, onClick }: StandProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y, width, height, status, standNo } = stand;

  let fillColor = statusColorMap[status];
  if (isHighlighted) fillColor = '#fbbf24'; // amber highlight
  if (isSelected) fillColor = '#3b82f6';    // blue selection
  if (isHovered && !isSelected && !isHighlighted) fillColor = '#93c5fd'; // light blue hover

  const strokeWidth = isSelected ? 4 : isHighlighted ? 3 : 1;
  const stroke = isSelected ? '#1e3a8a' : isHighlighted ? '#b45309' : '#374151';

  return (
    <Group
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        stroke={stroke}
        strokeWidth={strokeWidth}
        cornerRadius={6}
        shadowBlur={isSelected ? 8 : 0}
        shadowColor="rgba(0,0,0,0.2)"
        opacity={status === 'booked' ? 0.7 : 1}
      />
      <Text
        x={x + width / 2}
        y={y + height / 2}
        text={standNo}
        fontSize={14}
        fontFamily="sans-serif"
        fontStyle="bold"
        fill="#ffffff"
        align="center"
        verticalAlign="middle"
        offsetX={width / 2}
        offsetY={height / 2}
        listening={false} // improves performance
      />
    </Group>
  );
});

Stand.displayName = 'Stand';