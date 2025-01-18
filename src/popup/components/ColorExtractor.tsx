"use client";

import { useEffect, Dispatch, SetStateAction } from "react";
import { Color } from "../../../types/types";
import ColorPallet from "../components/ColorPallet";

interface ColorExtractorProps {
  numColors?: number;
  columns?: number;
  setColors?: Dispatch<SetStateAction<Color[]>>;
  colors?: Color[];
  setSelectedColorPickerColor?: Dispatch<SetStateAction<string>>;
  setColor?: Dispatch<SetStateAction<string>>;
  color: string;
  setIsPickerVisible: (isVisible: boolean) => void;
  isColorExtractor?: boolean;
}

const ColorExtractor: React.FC<ColorExtractorProps> = ({
  numColors,
  columns,
  setColors,
  colors,
  setSelectedColorPickerColor,
  setColor,
  color,
  setIsPickerVisible,
  isColorExtractor,
}) => {
  const extractColors = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "extractColors" }, (response) => {
          if (response?.colors) {
            if (setColors) {
              setColors(response.colors);
            }
          }
        });
      }
    });
  };
  useEffect(() => {
    extractColors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const sortedColors = colors
    ? colors.sort((a, b) => b.elements.length - a.elements.length)
    : [];

  return (
    <div>
      {colors && colors.length > 0 ? (
        <ColorPallet
          mostCommonColors={sortedColors}
          numColors={numColors}
          columns={columns}
          setColors={setColors}
          colors={colors}
          setColor={setColor}
          setSelectedColorPickerColor={setSelectedColorPickerColor}
          setIsPickerVisible={setIsPickerVisible}
          isColorExtractor={isColorExtractor}
        />
      ) : (
        <p className="mt-4 text-lg text-gray-600">
          Refresh the page. If this does not help, contact developer{" "}
          <a
            href="mailto:sinisamanojlovic@example.com"
            className="text-blue-500 underline"
          >
            SM
          </a>
          .
        </p>
      )}
    </div>
  );
};

export default ColorExtractor;
