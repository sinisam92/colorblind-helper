import React, { useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { getContrastColor } from "../../utils/helperFunctions";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState("rgb(255, 255, 255)");

  return (
    <div className="w-full grid place-items-center">
      <div>
        <RgbaStringColorPicker color={color} onChange={setColor} />
        <div
          style={{ backgroundColor: color, color: getContrastColor(color) }}
          className={`flex justify-center items-center w-[200px] h-[50px]`}
        >
          {color}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
