"use client";
import React from 'react';
import { Stage, Layer, } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { ShapeProps } from '@/types/transformer';
import Rectangle from './_components/Rectangle';


const initialRectangles: ShapeProps[] = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2',
  },
];

const TransformerPage: React.FC = () => {
  const [rectangles, setRectangles] = React.useState<ShapeProps[]>(initialRectangles);
  const [selectedId, selectShape] = React.useState<string | null>(null);
  const [dimensions, setDimensions] = React.useState({
    width: 800,
    height: 600,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <Stage
      width={dimensions.width}
      height={dimensions.height}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {rectangles.map((rect, index) => (
          <Rectangle
            key={rect.id}
            shapeProps={rect}
            isSelected={rect.id === selectedId}
            onSelect={() => selectShape(rect.id)}
            onChange={(newAttrs: ShapeProps) => {
              const updatedRectangles = [...rectangles];
              updatedRectangles[index] = newAttrs;
              setRectangles(updatedRectangles);
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default TransformerPage;