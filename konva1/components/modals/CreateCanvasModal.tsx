"use client";
import React from "react";

interface CreateCanvasModalProps {
  isOpen: boolean;
  width: number;
  height: number;
  backgroundColor: string;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onBgColorChange: (value: string) => void;
  onCancel: () => void;
  onCreate: () => void;
}

const CreateCanvasModal: React.FC<CreateCanvasModalProps> = ({
  isOpen,
  width,
  height,
  backgroundColor,
  onWidthChange,
  onHeightChange,
  onBgColorChange,
  onCancel,
  onCreate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 text-black flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create New Canvas</h2>
        <div className="mb-4">
          <label className="block mb-1">Width (px):</label>
          <input
            type="number"
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
            className="border p-2 w-full rounded"
            min="100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Height (px):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
            className="border p-2 w-full rounded"
            min="100"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Background Color:</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => onBgColorChange(e.target.value)}
            className="w-full h-10 border rounded"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCanvasModal;