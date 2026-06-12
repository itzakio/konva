"use client";
import React from "react";
import { Image, Transformer } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Image as KonvaImage } from "konva/lib/shapes/Image";
import { Transformer as KonvaTransformer } from "konva/lib/shapes/Transformer";
import useImage from "use-image";
import { ImageShapeProps } from "@/types/canvas";

interface TransformableImageProps {
  shapeProps: ImageShapeProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: ImageShapeProps) => void;
  onTopRightChange?: (pos: { x: number; y: number } | null) => void; // optional for reset button
}

const TransformableImage: React.FC<TransformableImageProps> = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onTopRightChange,
}) => {
  const [img] = useImage(shapeProps.src);
  const shapeRef = React.useRef<KonvaImage | null>(null);
  const trRef = React.useRef<KonvaTransformer | null>(null);

  // Update transformer when selected
  React.useEffect(() => {
    if (isSelected && shapeRef.current && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  // If image just loaded and we have natural dimensions but shapeProps width/height are zero, update
  React.useEffect(() => {
    if (img && shapeRef.current && (shapeProps.width === 0 || shapeProps.height === 0)) {
      onChange({
        ...shapeProps,
        width: img.width,
        height: img.height,
        scaleX: 1,
        scaleY: 1,
      });
    }
  }, [img, shapeProps, onChange]);

  // Report top‑right corner position for reset button (optional)
  React.useEffect(() => {
    if (!onTopRightChange) return;
    const updatePosition = () => {
      if (!isSelected || !shapeRef.current) {
        onTopRightChange(null);
        return;
      }
      const stage = shapeRef.current.getStage();
      if (!stage) return;
      const topRightWorld = {
        x: shapeProps.x + shapeProps.width * shapeProps.scaleX,
        y: shapeProps.y,
      };
      const absPos = stage.getAbsoluteTransform().point(topRightWorld);
      if (absPos) {
        onTopRightChange({ x: absPos.x + 10, y: absPos.y - 20 });
      } else {
        onTopRightChange(null);
      }
    };
    updatePosition();
  }, [isSelected, shapeProps, onTopRightChange]);

  if (!img) return null;

  return (
    <>
      <Image
        ref={shapeRef}
        image={img}
        x={shapeProps.x}
        y={shapeProps.y}
        width={shapeProps.width}
        height={shapeProps.height}
        scaleX={shapeProps.scaleX}
        scaleY={shapeProps.scaleY}
        rotation={shapeProps.rotation}
        draggable
        onClick={onSelect}
        onTap={onSelect}
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
          const rotation = node.rotation();
          // Reset scale to 1 and store actual dimensions
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            scaleX: 1,
            scaleY: 1,
            rotation: rotation,
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          rotateEnabled={true}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 10 || Math.abs(newBox.height) < 10) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TransformableImage;