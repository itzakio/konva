"use client";
import React from "react";

interface ImageThumbnailProps {
  src: string;
  alt: string;
  onDragStart: (e: React.DragEvent<HTMLImageElement>) => void;
}

const ImageThumbnail: React.FC<ImageThumbnailProps> = ({ src, alt, onDragStart }) => {
  return (
    <div className="w-24 h-24 border rounded overflow-hidden bg-gray-100">
      <img
        src={src}
        alt={alt}
        draggable="true"
        onDragStart={onDragStart}
        className="w-full h-full object-contain cursor-move"
      />
    </div>
  );
};

export default ImageThumbnail;