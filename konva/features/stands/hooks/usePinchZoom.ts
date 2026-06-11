import { useEffect, useRef } from 'react';

export const usePinchZoom = (stageRef: React.RefObject<any>, onZoom: (scale: number, point: { x: number; y: number }) => void) => {
  const initialDistance = useRef(0);
  const initialScale = useRef(1);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const getDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.hypot(dx, dy);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        initialDistance.current = getDistance(e.touches);
        initialScale.current = stage.scaleX();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const newDistance = getDistance(e.touches);
        const scale = initialScale.current * (newDistance / initialDistance.current);
        // Calculate center point
        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        onZoom(scale, { x: centerX, y: centerY });
      }
    };

    stage.getStage().container().addEventListener('touchstart', onTouchStart);
    stage.getStage().container().addEventListener('touchmove', onTouchMove);
    return () => {
      stage.getStage().container().removeEventListener('touchstart', onTouchStart);
      stage.getStage().container().removeEventListener('touchmove', onTouchMove);
    };
  }, [stageRef, onZoom]);
};