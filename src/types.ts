export type ColorBlindnessType = "protanopia" | "deuteranopia" | "tritanopia" | "normal";

export type ColorProfile = {
  value: ColorBlindnessType;
  label: string;
};
