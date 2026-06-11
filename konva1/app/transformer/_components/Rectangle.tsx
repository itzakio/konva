"use client";
import React from 'react';
import {  Rect, Transformer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Rect as KonvaRect } from 'konva/lib/shapes/Rect';
import { Transformer as KonvaTransformer } from 'konva/lib/shapes/Transformer';
import { RectangleProps } from '@/types/transformer';


const Rectangle: React.FC<RectangleProps> = ({ 
  shapeProps, 
  isSelected, 
  onSelect, 
  onChange 
}) => {
  const shapeRef = React.useRef<KonvaRect | null>(null);
  const trRef = React.useRef<KonvaTransformer | null>(null);

  React.useEffect(() => {
    if (isSelected && shapeRef.current && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e: KonvaEventObject<DragEvent>) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          if (!node) return;
          
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};
export default Rectangle;