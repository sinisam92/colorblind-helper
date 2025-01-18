import { FC, useState, useCallback, useEffect } from "react";
import { Color } from "../../../types/types";
import ColorblindSelect from "../components/ColorblindSelect";
import ColorPicker from "../components/ColorPicker";
import ColorExtractor from "../components/ColorExtractor";

const ColorAccessibility: FC = () => {
  const [color, setColor] = useState("");
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColorPickerColor, setSelectedColorPickerColor] =
    useState<string>("rgb(255, 255, 255)");
  const [shouldExtractColors, setShouldExtractColors] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleColorChange = useCallback(
    (newColor: string) => {
      setColor(newColor);

      const currentColorObject =
        colors.find((clr) => clr.color === selectedColorPickerColor) || colors[0];
      if (currentColorObject) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          if (activeTab && activeTab.id) {
            chrome.tabs.sendMessage(
              activeTab.id,
              {
                action: "updateColor",
                oldColor: color,
                newColor: newColor,
                elements: currentColorObject.elements.map((el) => ({
                  ...el,
                  cssProp: el.prop,
                })),
              },
              () => {
                // Set shouldExtractColors to true to trigger re-extraction
                setShouldExtractColors(true);
              }
            );
          }
        });
      }
    },
    [colors, selectedColorPickerColor, color]
  );

  const extractColors = useCallback(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "extractColors" }, (response) => {
          if (response?.colors) {
            setColors(response.colors);
          }
          setShouldExtractColors(false);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (shouldExtractColors) {
      extractColors();
    }
  }, [shouldExtractColors, extractColors]);

  return (
    <div>
      <ColorblindSelect />
      <h2 className="text-xl font-medium mb-4 ">Dominant Colors</h2>
      <small>
        Click on color and use color picker to change that color on page. Colors here
        reperesent original colors before applying colorblinde modes.
      </small>
      <div className="flex mt-6">
        <div>
          <ColorExtractor
            // uncomment this line to limit the number of colors displayed
            // numColors={10}
            columns={1}
            setColors={setColors}
            colors={colors}
            setColor={setColor}
            setSelectedColorPickerColor={setSelectedColorPickerColor}
            color={""}
            setIsPickerVisible={setIsPickerVisible}
            isColorExtractor={false}
          />
        </div>
        {isPickerVisible && (
          <div className="w-64 h-full ml-6 sticky top-[50px]">
            <ColorPicker
              setColor={handleColorChange}
              color={color}
              selectedColorPickerColor={selectedColorPickerColor}
              setIsPickerVisible={setIsPickerVisible}
              isPickerVisible={isPickerVisible}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorAccessibility;
