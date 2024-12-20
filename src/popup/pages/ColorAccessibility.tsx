import React from "react";
import ColorblindSelect from "../components/ColorblindSelect";
import ColorPicker from "../components/ColorPicker";
import ColorExtractor from "../components/ColorExtractor";

const ColorAccessibility: React.FC = () => {
  return (
    <div>
      <ColorblindSelect />
      <h2 className="text-xl font-medium mb-4 ">Dominant Colors</h2>
      <div className="flex mt-6">
        <div>
          <ColorExtractor numColors={5} columns={1} />
        </div>
        <div className="w-64 h-full ml-6 sticky top-[50px]">
          <ColorPicker />
        </div>
      </div>
    </div>
  );
};

export default ColorAccessibility;
