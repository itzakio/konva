
export interface ShapeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  id: string;
}

export interface RectangleProps {
  shapeProps: ShapeProps;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: ShapeProps) => void;
}