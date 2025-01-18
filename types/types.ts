export type ColorBlindnessType = "protanopia" | "deuteranopia" | "tritanopia" | "normal";

export interface Element {
  prop: string;
  tagName: string;
  className: string;
  id: string;
}
export interface Color {
  color: string;
  elements: Element[];
}
export type ColorProfile = {
  value: ColorBlindnessType;
  label: string;
};

export type Page = "home" | "accessibility" | "webpageColors" | "adjuster" | "about";
