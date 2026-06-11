"use client";
import React, { useEffect, useState } from "react";
import { Stage, Layer, Text, Rect } from "react-konva";

interface RectItem {
  id: number;
  color: string;
  position: { x: number; y: number };
  size: { w: number; h: number };
}

const App = () => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState("#ff0000");
  const [size, setSize] = useState({ h: 80, w: 80 });
  const [dimensions, setDimensions] = React.useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  }));
  const [textPosition, setTextPosition] = React.useState({
    x: 50,
    y: 50,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize rects with positions
  const [rects, setRects] = React.useState<RectItem[]>([
    {
      id: 1,
      color: "red",
      position: { x: 100, y: 200 },
      size: { w: 100, h: 100 },
    },
    {
      id: 2,
      color: "green",
      position: { x: 200, y: 200 },
      size: { w: 100, h: 100 },
    },
    {
      id: 3,
      color: "yellow",
      position: { x: 300, y: 200 },
      size: { w: 100, h: 100 },
    },
    {
      id: 4,
      color: "black",
      position: { x: 400, y: 200 },
      size: { w: 100, h: 100 },
    },
  ]);

  const handleRectClick = (rect: RectItem) => {
    console.log(
      `${rect.color} clicked at position: (${rect.position.x}, ${rect.position.y})`,
    );
  };

  const showPosition = (name: string, x: number, y: number) => {
    console.log(`${name} position: (${x}, ${y})`);
  };

  const updateRectPosition = (id: number, x: number, y: number) => {
    setRects((prevRects) =>
      prevRects.map((rect) =>
        rect.id === id ? { ...rect, position: { x, y } } : rect,
      ),
    );
  };

  const addBox = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get the color from state
    console.log("Selected color hex code:", selectedColor);

    // Create new rectangle
    const newRect: RectItem = {
      id: rects.length + 1,
      color: selectedColor,
      position: { x: 200, y: 100 },
      size: size,
    };

    setRects([...rects, newRect]);
    console.log("New box added with color:", selectedColor, size);

    // Close the form
    setShow(false);
    // Reset color picker
    setSelectedColor("#ff0000");
    setSize({ w: 80, h: 80 });
    
  };

  return (
    <div className="border-2 border-amber-500 w-fit mx-auto relative">
      {/* add button */}
      <button
        onClick={() => {
          setShow(!show);
        }}
        className="text-xl bg-gray-700 text-white size-8 rounded-full absolute top-2 right-2 cursor-pointer z-20"
      >
        +
      </button>
      {/* configure */}
      <div
        className={`w-1/3 bg-gray-50 h-100 absolute top-0 right-0 z-21 pt-12  ${show ? "block" : "hidden"}`}
      >
        <button
          onClick={() => {
            setShow(!show);
          }}
          className="text-xl bg-gray-700 text-white size-8 rounded-full absolute top-2 right-2 cursor-pointer z-20 rotate-45"
        >
          +
        </button>
        <form
          onSubmit={addBox}
          className="border h-full text-black flex flex-col gap-2 p-4"
        >
          <label htmlFor="color">Color</label>
          <input
            onChange={(e) => setSelectedColor(e.target.value)}
            type="color"
            name="color"
            id="color"
            className="border p-1"
          />
          <label htmlFor="color">Height (px)</label>
          <input
            onChange={(e) =>
              setSize({ ...size, h: parseInt(e.target.value) || 0 })
            }
            type="number"
            name="height"
            id="height"
            className="border p-1"
            placeholder="eg. 100"
            value={size.h}
          />
          <label htmlFor="color">width (px)</label>
          <input
            onChange={(e) =>
              setSize({ ...size, w: parseInt(e.target.value) || 0 })
            }
            type="number"
            name="width"
            id="width"
            className="border p-1"
            placeholder="eg. 100"
            value={size.w}
          />

          <div className="flex gap-4">
            <button className="w-full py-2 bg-red-400 rounded-xl cursor-pointer active:scale-98">
              Cancel
            </button>
            <button className="w-full py-2 bg-green-400 rounded-xl cursor-pointer active:scale-98">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        className="border w-200 overflow-hidden mx-auto h-100 bg-white"
      >
        <Layer>
          <Text
            onClick={() => {
              showPosition("Text", textPosition.x, textPosition.y);
            }}
            text="Draggable Text"
            x={textPosition.x}
            y={textPosition.y}
            draggable
            fill={isDragging ? "green" : "black"}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e) => {
              setIsDragging(false);
              setTextPosition({
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
          />

          {rects.map((rect) => (
            <Rect
              key={rect.id}
              x={rect.position.x}
              y={rect.position.y}
              onClick={() => handleRectClick(rect)}
              draggable
              width={rect.size.w}
              height={rect.size.h}
              fill={rect.color}
              stroke={rect.color === "white" ? "black" : undefined}
              strokeWidth={rect.color === "white" ? 2 : 0}
              onDragEnd={(e) => {
                updateRectPosition(rect.id, e.target.x(), e.target.y());
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
