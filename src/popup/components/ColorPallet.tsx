import { Dispatch, SetStateAction, FC, useState } from "react";
import convert from "color-convert";
import { Color } from "../../../types/types";
import { getContrastColor, notApplicableColor } from "../../utils/helperFunctions";

interface ColorPalletProps {
  mostCommonColors: Color[];
  numColors?: number;
  columns?: number;
  setColors?: Dispatch<SetStateAction<Color[]>>;
  colors?: Color[];
  setSelectedColorPickerColor?: Dispatch<SetStateAction<string>>;
  setColor?: Dispatch<SetStateAction<string>>;
  setIsPickerVisible?: (isVisible: boolean) => void;
  isColorExtractor?: boolean;
}

const ColorPallet: FC<ColorPalletProps> = ({
  mostCommonColors,
  numColors,
  columns,
  setSelectedColorPickerColor,
  setColor,
  setIsPickerVisible,
  isColorExtractor,
}) => {
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const displayedColors = mostCommonColors
    .filter((color) => !notApplicableColor(convert.hex.rgb(color.color)))
    .slice(0, numColors);

  const columnClass =
    columns === 1 ? "grid-cols-1" : columns === 2 ? "grid-cols-2" : "grid-cols-3";

  const handleColorSet = (color: string) => {
    if (isColorExtractor && window.isSecureContext) {
      navigator.clipboard.writeText(color);
      setIsCopied(color);
    }
    setTimeout(() => {
      setIsCopied(null);
    }, 5000);
    setColor?.(color);
    setSelectedColorPickerColor?.(color);
    setIsPickerVisible?.(true);
  };

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
              className={`flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer`}
              style={{
                backgroundColor: color.color,
              }}
              onClick={() => handleColorSet(color.color)}
            >
              <div aria-label={`Color sample: ${color.color}`} />
              <ul className="text-sm font-mono" style={{ color: contrastedColor }}>
                <li>Color: {convert.rgb.keyword(rgbValues)}</li>
                <li>RGB: {color.color}</li>
              </ul>
              {isColorExtractor && (
                <small style={{ color: contrastedColor }}>
                  {isCopied === color.color ? "Copied!" : "Click anywhere to copy color"}
                </small>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ColorPallet;
