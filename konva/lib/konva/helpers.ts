export const worldToStage = (
  worldX: number,
  worldY: number,
  stageX: number,
  stageY: number,
  scale: number
): { x: number; y: number } => ({
  x: stageX + worldX * scale,
  y: stageY + worldY * scale,
});

export const stageToWorld = (
  stageX: number,
  stageY: number,
  stagePosX: number,
  stagePosY: number,
  scale: number
): { x: number; y: number } => ({
  x: (stageX - stagePosX) / scale,
  y: (stageY - stagePosY) / scale,
});

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const getStageCenter = (stage: any) => {
  if (!stage) return { x: 0, y: 0 };
  return {
    x: stage.width() / 2,
    y: stage.height() / 2,
  };
};