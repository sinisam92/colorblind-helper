import { extractColors } from "../utils/colorsExtractor";

const normalizeColor = (color: string): string => {
  if (color.startsWith("rgb")) {
    const rgbaMatch = color.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
    if (rgbaMatch) {
      const [r, g, b, a] = rgbaMatch;
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

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === "extractColors") {
    const colors = extractColors();
    sendResponse({ colors });
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateColor") {
    const { oldColor, newColor, elements } = message;

    const normalizedOldColor = normalizeColor(oldColor);
    const normalizedNewColor = normalizeColor(newColor);
    console.log("normalizedOldColor", normalizedOldColor);
    console.log("normalizedNewColor", normalizedNewColor);

    const processedElements = new Set<Element>();

    elements.forEach(
      (el: { id: number; className: string; tagName: string; cssProp: string }) => {
        const selector = el.id
          ? `#${el.id}`
          : el.className
          ? `.${el.className.split(" ").join(".")}`
          : el.tagName.toLowerCase();

        const domElements = document.querySelectorAll(selector);
        domElements.forEach((domEl) => {
          if (processedElements.has(domEl)) return;

          const computedStyle = window.getComputedStyle(domEl);
          const currentColor = normalizeColor(computedStyle.getPropertyValue(el.cssProp));

          console.log({
            currentColor,
            oldColor: normalizedOldColor,
            newColor: normalizedNewColor,
            areColorsEqual: currentColor === normalizedOldColor,
          });

          const originalColor = domEl.getAttribute("data-original-color") || currentColor;

          if (
            currentColor === normalizedOldColor ||
            originalColor === normalizedOldColor
          ) {
            (domEl as HTMLElement).style.setProperty(el.cssProp, normalizedNewColor);
            domEl.setAttribute("data-original-color", originalColor);
            processedElements.add(domEl);
          }
        });
      }
    );
  }
});
