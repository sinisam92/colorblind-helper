import { FC, useState } from "react";
import ColorExtractor from "../components/ColorExtractor";
import { Color } from "../../../types/types";

interface ColorExtractorProps {
  numColors?: number;
  columns?: number;
  setColors?: React.Dispatch<React.SetStateAction<Color[]>>;
  colors?: Color[];
  color?: string;
  setIsPickerVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

const WebpageColors: FC<ColorExtractorProps> = () => {
  const [colors, setColors] = useState<Color[]>([]);
  return (
    <div>
      <ColorExtractor
        columns={2}
        colors={colors}
        setColors={setColors}
        color={""}
        setIsPickerVisible={() => {}}
        isColorExtractor={true}
      />
    </div>
  );
};

export default WebpageColors;
