import React, { useState } from "react";

const Popup: React.FC = () => {
  const [colors, setColors] = useState<string[]>([]);

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
    <div className="w-full">
      <h1 className="text-2xl text-[#1F2937] font-bold">Color Extractor</h1>
      <button onClick={handleExtractColors}>Extract Colors</button>
      <ul>
        {colors.map((color, index) => (
          <li key={index} style={{ color }}>
            {color}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
