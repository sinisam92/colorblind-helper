import { extractColors } from "../utils/colorsExtractor";

const applyColorBlindness = (condition: string) => {
  const svgFilters = `
    <svg id="colorblind-filters" style="display: none">
      <defs>
        <filter id="protanopia">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.567, 0.433, 0,     0, 0
                    0.558, 0.442, 0,     0, 0
                    0,     0.242, 0.758, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>
        <filter id="deuteranopia">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.625, 0.375, 0,   0, 0
                    0.7,   0.3,   0,   0, 0
                    0,     0.3,   0.7, 0, 0
                    0,     0,     0,   1, 0"
          />
        </filter>
        <filter id="tritanopia">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.95, 0.05,  0,     0, 0
                    0,    0.433, 0.567, 0, 0
                    0,    0.475, 0.525, 0, 0
                    0,    0,     0,     1, 0"
          />
        </filter>
      </defs>
    </svg>
  `;

  const existingFilters = document.getElementById("colorblind-filters");
  if (existingFilters) {
    existingFilters.remove();
  }
  // add filter
  document.body.insertAdjacentHTML("beforeend", svgFilters);

  if (condition === "normal") {
    document.body.style.filter = "none";
  } else {
    document.body.style.filter = `url(#${condition})`;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
  if (request.action === "updateColorBlindness") {
    applyColorBlindness(request.condition);
  }
});

// syncs colorblind condition from storage on page load
chrome.storage.sync.get("visionType", (data) => {
  if (data.visionType) {
    applyColorBlindness(data.visionType);
  }
});

// color extraction listiner
const colors = extractColors();
console.log("Extracted colors:", colors);
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === "extractColors") {
    const colors = extractColors();
    sendResponse({ colors });
  }
});
