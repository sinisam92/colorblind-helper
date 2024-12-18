import { useState } from "react";
import { Color } from "../../../types/types";
import ColorPallet from "../components/ColorPallet";

const ColorExtractor = () => {
  const [colors, setColors] = useState<Color[]>([]);

  const mostCommonColors: Color[] = colors
    .sort((a, b) => b.elements.length - a.elements.length)
    .slice(0, 5);

  const handleExtractColors = () => {
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
  return (
    <div>
      <h1 className="text-3xl font-bold text-primaryText">Color Extractor</h1>
      <button
        onClick={handleExtractColors}
        className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors"
      >
        Extract Colors
      </button>
      {mostCommonColors.length > 0 && <ColorPallet mostCommonColors={mostCommonColors} />}
    </div>
  );
};

export default ColorExtractor;
