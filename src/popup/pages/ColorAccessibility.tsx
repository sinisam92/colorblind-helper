import React from "react";
import ColorblindSelect from "../components/ColorblindSelect";
import ColorPicker from "../components/ColorPicker";

const ColorAccessibility: React.FC = () => {
  return (
    <div>
      <ColorblindSelect />
      <ColorPicker />
    </div>
  );
};

export default ColorAccessibility;
