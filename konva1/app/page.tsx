import React from "react";

const Home = () => {
  return (
    <div className="max-w-350 mx-auto border">
      <div className="h-screen w-full mx-auto flex flex-col">
        <div className="border p-2">Nav</div>
        <div className="flex border flex-1">
          <div className="border w-10 flex justify-center">T</div>
          <div className="border flex-1 justify-center items-center">
            Canvas
          </div>
          <div className="border w-80">Layer</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
