import { extractColors } from "../utils/colorsExtractor";

const colors = extractColors();
console.log("Extracted colors:", colors);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "extractColors") {
    const colors = extractColors();
    sendResponse({ colors });
  }
});
