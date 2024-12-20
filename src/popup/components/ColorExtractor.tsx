"use client";

import { useState, useEffect } from "react";
import { Color } from "../../../types/types";
import ColorPallet from "../components/ColorPallet";

interface ColorExtractorProps {
  numColors?: number;
  columns?: number;
}

const ColorExtractor: React.FC<ColorExtractorProps> = ({ numColors, columns }) => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    extractColors();
  }, []);

  const extractColors = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "extractColors" }, (response) => {
          if (response?.colors) {
            setColors(response.colors);
          }
        });
      }
    });
  };

  const sortedColors = colors.sort((a, b) => b.elements.length - a.elements.length);

  return (
    <div>
      {colors.length > 0 ? (
        <ColorPallet
          mostCommonColors={sortedColors}
          numColors={numColors}
          columns={columns}
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
