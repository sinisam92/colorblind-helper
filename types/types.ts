export type ColorBlindnessType = "protanopia" | "deuteranopia" | "tritanopia" | "normal";
export interface Color {
  color: string;
  elements: Array<string>;
}
export type ColorProfile = {
  value: ColorBlindnessType;
  label: string;
};

export type Page = "home" | "accessibility" | "extractor" | "adjuster" | "about";
