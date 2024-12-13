import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { ColorProfile } from "../../types/types";

const visionTypes: ColorProfile[] = [
  { value: "normal", label: "Normal Vision" },
  { value: "protanopia", label: "Protanopia (Red-Blind)" },
  { value: "deuteranopia", label: "Deuteranopia (Green-Blind)" },
  { value: "tritanopia", label: "Tritanopia (Blue-Blind)" },
];

const SimpleColorblindSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVision, setSelectedVision] = useState<ColorProfile>(visionTypes[0]);

  console.log("selectedVision", selectedVision);

  return (
    <div className="relative w-64">
      <label htmlFor="vision" className="block text-sm font-medium text-gray-700 mb-3">
        Color Vision Type
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{selectedVision.label}</span>
        <span className="flex items-center pr-2 pointer-events-none">
          <ChevronDown color="#474748" />
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="listbox"
        >
          {visionTypes.map((type) => (
            <li
              key={type.value}
              className={`${
                type.value === selectedVision.value
                  ? "text-blue-900 bg-blue-100"
                  : "text-gray-900"
              } cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 text-sm`}
              role="option"
              aria-selected={type.value === selectedVision.value}
              onClick={() => {
                setSelectedVision(type);
                setIsOpen(false);
              }}
            >
              <span
                className={`block truncate ${
                  type.value === selectedVision.value ? "font-semibold" : "font-normal"
                }`}
              >
                {type.label}
              </span>
              {type.value === selectedVision.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                  <Check color="#2e5ff5" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleColorblindSelect;
