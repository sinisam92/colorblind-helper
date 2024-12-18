import React from "react";
import convert from "color-convert";
import { Color } from "../../../types/types";

interface ColorPalletProps {
  mostCommonColors: Color[];
}

const ColorPallet: React.FC<ColorPalletProps> = ({ mostCommonColors }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-medium mb-4 ">Dominant Colors</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mostCommonColors.map((color, index) => {
          const rgbValues: [number, number, number] = color.color
            .match(/\d+/g)
            ?.map(Number) as [number, number, number];

          return (
            <li
              key={index}
              className={`flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105`}
              style={{ backgroundColor: color.color }}
            >
              <div
                className={`w-16 h-16 rounded-full shadow-inner mb-2 `}
                aria-label={`Color sample: ${color.color}`}
              />
              <ul className="text-sm font-mono text-gray-600 dark:text-gray-400">
                <li>Color: {convert.rgb.keyword(rgbValues)}</li>
                <li>RGB: {color.color}</li>
                <li>HSL: {convert.rgb.hsl(rgbValues)}</li>
                <li>HEX: {convert.rgb.hex(rgbValues)}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ColorPallet;
