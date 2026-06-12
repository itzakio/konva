"use client";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { Stage as StageType } from "konva/lib/Stage";
import { KonvaEventObject } from "konva/lib/Node";
import CreateCanvasModal from "@/components/modals/CreateCanvasModal";
import Navbar from "@/components/layout/Navbar";
import OptionBar from "@/components/layout/OptionBar";
import ImageThumbnail from "@/components/ImageThumbnail";
import { CanvasItem, ImageShapeProps } from "@/types/canvas";
import TransformableImage from "@/components/TransformableImage";

const Home: React.FC = () => {
  const [canvases, setCanvases] = useState<CanvasItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newWidth, setNewWidth] = useState(800);
  const [newHeight, setNewHeight] = useState(600);
  const [newBgColor, setNewBgColor] = useState("#f5f5f5");
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<StageType | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // State for images on the canvas
  const [images, setImages] = useState<ImageShapeProps[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const dragUrlRef = useRef<string>("");

  const centerCanvas = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const activeCanvas = canvases[canvases.length - 1];
    if (!activeCanvas) return;

    const scaledWidth = activeCanvas.width * scale;
    const scaledHeight = activeCanvas.height * scale;

    const newX = (containerRect.width - scaledWidth) / 2;
    const newY = (containerRect.height - scaledHeight) / 2;
    setPosition({ x: newX, y: newY });
  };

  useEffect(() => {
    if (canvases.length > 0) centerCanvas();
  }, [canvases, scale]);

  useEffect(() => {
    const handleResize = () => centerCanvas();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [canvases, scale]);

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    dragUrlRef.current = e.currentTarget.src;
  };

  const addCanvas = () => {
    if (newWidth > 0 && newHeight > 0) {
      setCanvases([
        ...canvases,
        {
          id: Date.now().toString(),
          width: newWidth,
          height: newHeight,
          scale: 1,
          position: { x: 0, y: 0 },
          backgroundColor: newBgColor,
        },
      ]);
      // Clear images when switching to a new canvas? Or keep per canvas? For simplicity, clear.
      setImages([]);
      setSelectedImageId(null);
    }
    setShowModal(false);
    setNewWidth(800);
    setNewHeight(600);
    setNewBgColor("#f5f5f5");
    setScale(1);
  };

  const zoomIn = () => setScale((s) => Math.min(s * 1.2, 3));
  const zoomOut = () => setScale((s) => Math.max(s / 1.2, 0.3));

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const delta = e.evt.deltaY > 0 ? 0.95 : 1.05;
    setScale((s) => Math.min(Math.max(s * delta, 0.3), 3));
  };

  const activeCanvas = canvases[canvases.length - 1];

  const handleBackgroundColorChange = (color: string) => {
    if (activeCanvas) {
      setCanvases((prev) =>
        prev.map((c) =>
          c.id === activeCanvas.id ? { ...c, backgroundColor: color } : c,
        ),
      );
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!stageRef.current || !activeCanvas) return;

    const stage = stageRef.current;
    // Get drop position relative to the stage (considering zoom/pan)
    // But we use stage.getPointerPosition() which returns position in stage coordinates
    stage.setPointersPositions(e);
    const pointer = stage.getPointerPosition();
    if (!pointer || !dragUrlRef.current) return;

    // Load image to get natural dimensions
    const imgElement = new window.Image();
    imgElement.src = dragUrlRef.current;
    imgElement.onload = () => {
      const newImage: ImageShapeProps = {
        id: `img-${Date.now()}-${Math.random()}`,
        src: dragUrlRef.current,
        x: pointer.x - imgElement.width / 2, // center on pointer
        y: pointer.y - imgElement.height / 2,
        width: imgElement.width,
        height: imgElement.height,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        originalX: pointer.x - imgElement.width / 2,
        originalY: pointer.y - imgElement.height / 2,
        originalWidth: imgElement.width,
        originalHeight: imgElement.height,
        originalScaleX: 1,
        originalScaleY: 1,
        originalRotation: 0,
      };
      setImages((prev) => [...prev, newImage]);
    };
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleImageChange = (newAttrs: ImageShapeProps) => {
    setImages((prev) =>
      prev.map((img) => (img.id === newAttrs.id ? newAttrs : img)),
    );
  };

  const handleDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedImageId(null);
    }
  };

  return (
    <div className="max-w-350 mx-auto border">
      <div className="h-screen w-full mx-auto flex flex-col">
        <Navbar onAddCanvas={() => setShowModal(true)} />

        <div className="flex border flex-1 overflow-hidden">
          <div className="border w-10 flex justify-center">T</div>

          {/* Scrollable canvas area with drop */}
          <div
            ref={containerRef}
            className="border flex-1 overflow-auto bg-gray-100 relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {activeCanvas ? (
              <div
                style={{
                  width: activeCanvas.width,
                  height: activeCanvas.height,
                  transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                  transformOrigin: "0 0",
                }}
              >
                <Stage
                  width={activeCanvas.width}
                  height={activeCanvas.height}
                  onWheel={handleWheel}
                  ref={stageRef}
                  style={{ backgroundColor: activeCanvas.backgroundColor }}
                  onMouseDown={handleDeselect}
                  onTouchStart={handleDeselect}
                >
                  <Layer>
                    {images.map((image) => (
                      <TransformableImage
                        key={image.id}
                        shapeProps={image}
                        isSelected={selectedImageId === image.id}
                        onSelect={() => setSelectedImageId(image.id)}
                        onChange={handleImageChange}
                      />
                    ))}
                  </Layer>
                </Stage>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No canvas. Click &quot;Add Canvas&quot; to start.
              </div>
            )}
          </div>

          <OptionBar
            activeCanvas={activeCanvas}
            onDragStart={handleDragStart}
            scale={scale}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onBackgroundColorChange={handleBackgroundColorChange}
          />
        </div>
      </div>

      <CreateCanvasModal
        isOpen={showModal}
        width={newWidth}
        height={newHeight}
        backgroundColor={newBgColor}
        onWidthChange={setNewWidth}
        onHeightChange={setNewHeight}
        onBgColorChange={setNewBgColor}
        onCancel={() => setShowModal(false)}
        onCreate={addCanvas}
      />
    </div>
  );
};

export default Home;
