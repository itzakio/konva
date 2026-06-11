"use client";
import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { Stage as StageType } from 'konva/lib/Stage';
import useImage from 'use-image';

interface ImageType {
  src: string;
  x: number;
  y: number;
}

interface URLImageProps {
  image: ImageType;
}

const URLImage: React.FC<URLImageProps> = ({ image }) => {
  const [img] = useImage(image.src);
  
  return (
    <Image
      image={img}
      alt=""
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      draggable
    />
  );
};

const App: React.FC = () => {
  const dragUrl = React.useRef<string>('');
  const stageRef = React.useRef<StageType | null>(null);
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [dimensions, setDimensions] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight : 600,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (stageRef.current) {
      stageRef.current.setPointersPositions(e);
      const pointerPosition = stageRef.current.getPointerPosition();
      if (pointerPosition && dragUrl.current) {
        const newImage: ImageType = {
          x: pointerPosition.x,
          y: pointerPosition.y,
          src: dragUrl.current,
        };
        setImages(prevImages => [...prevImages, newImage]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => {
    dragUrl.current = e.currentTarget.src;
  };

  return (
    <div className="p-4">
      <p className="mb-4">Try to drag and drop the image into the stage:</p>
      <div className="mb-4">
        <img
          alt="lion"
          src="https://konvajs.org/assets/lion.png"
          draggable="true"
          onDragStart={handleDragStart}
          className="w-24 h-24 border border-gray-300 rounded cursor-move"
        />
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border border-gray-400 rounded"
      >
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          style={{ backgroundColor: '#f5f5f5' }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image, index) => (
              <URLImage key={`${image.src}-${index}`} image={image} />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default App;