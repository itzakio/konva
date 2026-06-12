"use client";
import React from "react";

interface NavbarProps {
  onAddCanvas: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddCanvas }) => {
  return (
    <div className="border p-2">
      <ul className="flex items-center gap-2">
        <li>
          <button onClick={onAddCanvas} className="cursor-pointer">
            Add Canvas
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;