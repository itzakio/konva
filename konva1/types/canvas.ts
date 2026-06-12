export interface CanvasItem {
  id: string;
  width: number;
  height: number;
  scale: number;
  position: { x: number; y: number };
  backgroundColor: string;
}

export interface ImageShapeProps {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  // original values for reset
  originalX: number;
  originalY: number;
  originalWidth: number;
  originalHeight: number;
  originalScaleX: number;
  originalScaleY: number;
  originalRotation: number;
}