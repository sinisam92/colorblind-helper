import React from "react";
import convert from "color-convert";
import { Color } from "../../../types/types";
import { getContrastColor, notApplicableColor } from "../../utils/helperFunctions";

interface ColorPalletProps {
  mostCommonColors: Color[];
  numColors?: number;
  columns?: number;
}

const ColorPallet: React.FC<ColorPalletProps> = ({
  mostCommonColors,
  numColors,
  columns,
}) => {
  const displayedColors = mostCommonColors
    .filter((color) => !notApplicableColor(convert.hex.rgb(color.color)))
    .slice(0, numColors);

  const columnClass =
    columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-2" : "grid-cols-3";
  return (
    <div className="mt-2">
      <ul className={`grid ${columnClass} md:grid-cols-3 lg:grid-cols-4 gap-4`}>
        {displayedColors.map((color, index) => {
          const contrastedColor = getContrastColor(color.color);

          const rgbValues: [number, number, number] = color.color
            .match(/\d+/g)
            ?.map(Number) as [number, number, number];

          return (
            <li
              key={index}
              className={`flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105`}
              style={{
                backgroundColor: color.color,
              }}
            >
              <div aria-label={`Color sample: ${color.color}`} />
              <ul className="text-sm font-mono" style={{ color: contrastedColor }}>
                <li>Color: {convert.rgb.keyword(rgbValues)}</li>
                <li>RGB: {color.color}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ColorPallet;
