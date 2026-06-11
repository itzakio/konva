"use client";
import React from "react";
import { Stage, Layer, Text, Rect } from "react-konva";

interface RectItem {
  id: number;
  color: string;
  position: { x: number; y: number };
}

const App = () => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [textPosition, setTextPosition] = React.useState({
    x: 50,
    y: 50,
  });

  // Initialize rects with positions
  const [rects, setRects] = React.useState<RectItem[]>([
    { id: 1, color: "red", position: { x: 100, y: 200 } },
    { id: 2, color: "green", position: { x: 200, y: 200 } },
    { id: 3, color: "yellow", position: { x: 300, y: 200 } },
    { id: 4, color: "black", position: { x: 400, y: 200 } },
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
    console.log("box added");
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
          <input type="color" name="color" id="color" className="border p-1" />
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
        width={window.innerWidth}
        height={window.innerHeight}
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
              width={80}
              height={80}
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
