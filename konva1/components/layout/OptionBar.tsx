"use client";
import { CanvasItem } from "@/types/canvas";
import React, { useState } from "react";
import ImageThumbnail from "../ImageThumbnail";

interface OptionBarProps {
  activeCanvas: CanvasItem | null;
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onBackgroundColorChange: (color: string) => void;
onDragStart: (e: React.DragEvent<HTMLImageElement>) => void;
}

const OptionBar: React.FC<OptionBarProps> = ({
  activeCanvas,
  scale,
  onZoomIn,
  onZoomOut,
  onBackgroundColorChange,
  onDragStart
}) => {
  const [active, setActive] = useState("options");
  
  return (
    <div className="border w-80 p-2">
      <div className="flex w-full">
        <button
          onClick={() => setActive("options")}
          className="border p-1 w-full cursor-pointer"
        >
          Options
        </button>
        <button
          onClick={() => setActive("assets")}
          className="border p-1 w-full cursor-pointer"
        >
          Assets
        </button>
      </div>
      {active === "options" ? (
        <div>
          <h3 className="font-bold">Option Panel</h3>
          {activeCanvas && (
            <div className="mt-2 space-y-2">
              <button
                onClick={onZoomIn}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Zoom In
              </button>
              <button
                onClick={onZoomOut}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Zoom Out
              </button>
              <p className="text-sm mt-2">Scale: {scale.toFixed(2)}</p>

              <p className="text-sm mt-2">Canvas Background:</p>
              <input
                type="color"
                value={activeCanvas.backgroundColor}
                onChange={(e) => onBackgroundColorChange(e.target.value)}
                className="w-full h-8 rounded border"
              />
            </div>
          )}
          <div>
            <h3 className="font-bold">Layers</h3>
          </div>
        </div>
      ) : (
        <div>
                  {/* Image thumbnails bar (you can place anywhere, e.g., below navbar) */}
      <div className="flex gap-2 p-2 border-t ">
        <ImageThumbnail
          src="https://konvajs.org/assets/lion.png"
          alt="lion"
          onDragStart={onDragStart}
        />
        <ImageThumbnail
          src="/road/road.png"
          alt="road"
          onDragStart={onDragStart}
        />
        {/* Add more thumbnails as needed */}
      </div>
        </div>
      )}
    </div>
  );
};

export default OptionBar;
