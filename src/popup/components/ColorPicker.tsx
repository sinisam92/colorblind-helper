import { FC, useCallback, useState } from "react";
import { RgbaStringColorPicker } from "react-colorful";
import { getContrastColor } from "../../utils/helperFunctions";

interface ColorPickerProps {
  setColor: (colors: string) => void;
  color: string;
  selectedColorPickerColor: string;
  setSelectedColorPickerColor?: (color: string) => void;
  setIsPickerVisible: (isVisible: boolean) => void;
  isPickerVisible?: boolean;
}

const ColorPicker: FC<ColorPickerProps> = ({ setColor, color, setIsPickerVisible }) => {
  const [internalColor, setInternalColor] = useState(color);

  const handleSetColor = useCallback(() => {
    setColor(internalColor);
    setIsPickerVisible(false);
  }, [internalColor, setColor, setIsPickerVisible]);

  return (
    <div className="w-full grid place-items-center mt-2">
      <div>
        <RgbaStringColorPicker color={internalColor} onChange={setInternalColor} />
        <div
          style={{
            backgroundColor: internalColor,
            color: getContrastColor(internalColor),
          }}
          className={`flex justify-center items-center w-[200px] h-[50px] rounded-b-lg`}
        >
          {internalColor}
        </div>
        <button
          onClick={handleSetColor}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Set Color
        </button>
      </div>
    </div>
  );
};

export default ColorPicker;
