const parseColor = (color: string): [number, number, number, number?] | null => {
  const match = color.match(
    /rgba?\(\s*(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])(?:\s*,\s*(0(\.\d+)?|1(\.0+)?))?\s*\)/
  );

  if (!match) {
    return null;
  }
  return [
    parseInt(match[1]),
    parseInt(match[2]),
    parseInt(match[3]),
    match[4] ? parseFloat(match[4]) : undefined,
  ];
};

export const getContrastColor = (color: string): string | undefined => {
  const parsedColor = parseColor(color);

  if (!parsedColor) {
    return undefined;
  }

  const [r, g, b, a] = parsedColor;

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  if (a !== undefined && a < 0.5) {
    return "#000000";
  }

  return luminance > 0.5 ? "#000000" : "#ffffff";
};

export const notApplicableColor = (
  rgb: [number, number, number] | [number, number, number, number]
): boolean => {
  const [r, g, b] = rgb;

  if (r === g && g === b) {
    return true;
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const difference = max - min;

  const grayscaleThreshold = 20;

  const lightThreshold = 230;
  const isLight = r > lightThreshold && g > lightThreshold && b > lightThreshold;

  return difference <= grayscaleThreshold || isLight;
};

export const normalizeColor = (color: string): string => {
  if (color.startsWith("rgb")) {
    const rgbaMatch = color.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
    if (rgbaMatch) {
      const [, r, g, b, a] = rgbaMatch;
      if (!a || parseFloat(a) === 1) {
        return `rgb(${r}, ${g}, ${b})`;
      }
    }
  } else if (color.startsWith("#")) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return color;
};
