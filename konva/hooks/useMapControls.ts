import { useRef, useState, useCallback } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';
import { siteConfig } from '@/config/site';

const { minScale, maxScale } = siteConfig.map;

export const useMapControls = (initialScale = siteConfig.map.defaultScale, initialPosition = siteConfig.map.defaultPosition) => {
  const stageRef = useRef<any>(null);
  const [scale, setScale] = useState(initialScale);
  const [position, setPosition] = useState(initialPosition);

  const handleWheel = useCallback((e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = scale;
    const pointer = stage.getPointerPosition();
    const delta = e.evt.deltaY > 0 ? 0.95 : 1.05;
    let newScale = oldScale * delta;
    newScale = Math.min(Math.max(newScale, minScale), maxScale);

    const mousePointTo = {
      x: (pointer.x - position.x) / oldScale,
      y: (pointer.y - position.y) / oldScale,
    };

    const newPosition = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    setScale(newScale);
    setPosition(newPosition);
  }, [scale, position]);

  const handleDragMove = useCallback((e: KonvaEventObject<DragEvent>) => {
    setPosition({ x: e.target.x(), y: e.target.y() });
  }, []);

  const zoomIn = () => {
    const newScale = Math.min(scale * 1.2, maxScale);
    setScale(newScale);
  };

  const zoomOut = () => {
    const newScale = Math.max(scale / 1.2, minScale);
    setScale(newScale);
  };

  const focusOnPoint = (pointX: number, pointY: number, targetScale = 1.2) => {
    const stage = stageRef.current;
    if (!stage) return;
    const stageWidth = stage.width();
    const stageHeight = stage.height();
    const newScale = Math.min(Math.max(targetScale, minScale), maxScale);
    const newX = stageWidth / 2 - pointX * newScale;
    const newY = stageHeight / 2 - pointY * newScale;
    setScale(newScale);
    setPosition({ x: newX, y: newY });
  };

  return {
    stageRef,
    scale,
    position,
    handleWheel,
    handleDragMove,
    zoomIn,
    zoomOut,
    setPosition,
    setScale,
    focusOnPoint,
  };
};