const parseColor = (color: string): [number, number, number] => {
  console.log("Color in parse:", color);

  const match = color.match(
    /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(\d+(\.\d+)?))?\)$/
  );

  if (!match) {
    throw new Error("Invalid color format. Please use RGB or RGBA.");
  }
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
};

export const getContrastColor = (color: string): string => {
  const [r, g, b] = parseColor(color);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#ffffff";
};
