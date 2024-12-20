import React from "react";
import ColorExtractor from "../components/ColorExtractor";

interface ColorExtractorProps {
  numColors?: number;
}

const WebpageColors: React.FC<ColorExtractorProps> = () => {
  return (
    <div>
      <ColorExtractor columns={2} />
    </div>
  );
};

export default WebpageColors;
