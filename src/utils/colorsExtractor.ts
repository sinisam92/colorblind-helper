interface ElementInfo {
  tagName: string;
  className: string;
  id: string;
  prop: string;
  selector: string;
  originalColor: string;
}

interface ColorInfo {
  color: string;
  elements: ElementInfo[];
}

const getElementSelector = (element: Element): string => {
  const parts = [];
  while (element.parentElement && element.tagName.toLowerCase() !== "body") {
    let selector = element.tagName.toLowerCase();
    if (element.id) {
      selector += `#${element.id}`;
    } else if (element.className) {
      selector += `.${Array.from(element.classList).join(".")}`;
    } else {
      const siblings = Array.from(element.parentElement.children);
      const index = siblings.indexOf(element) + 1;
      selector += `:nth-child(${index})`;
    }
    parts.unshift(selector);
    element = element.parentElement;
  }
  return parts.join(" > ");
};

export const extractColors = (): ColorInfo[] => {
  const colorAndLocationMap = new Map<string, ElementInfo[]>();
  const excludedColors = new Set([
    "none",
    "transparent",
    "rgba(0, 0, 0, 1)",
    "rgba(0, 0, 0, 0)",
    "rgba(255, 255, 255, 1)",
    "rgb(255, 255, 255)",
    "rgb(0, 0, 0)",
    "rgba(0, 0, 0, 0.8)",
  ]);

  const relevantProperties = [
    "color",
    "background-color",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
    "outline-color",
    "text-decoration-color",
    "fill",
    "stroke",
  ];

  const excludedElements =
    "script, link, meta, title, noscript, template, head, style, body";
  const allElements = document.querySelectorAll(`*:not(${excludedElements})`);

  const isExcludedColor = (color: string): boolean => excludedColors.has(color);

  for (const element of allElements) {
    const styles = window.getComputedStyle(element);

    for (const prop of relevantProperties) {
      const color = styles.getPropertyValue(prop);

      if (color && !isExcludedColor(color)) {
        if (!colorAndLocationMap.has(color)) {
          colorAndLocationMap.set(color, []);
        }

        const elementInfo: ElementInfo = {
          tagName: element.tagName.toLowerCase(),
          className: element instanceof HTMLElement ? element.className : "",
          id: element.id,
          prop,
          selector: getElementSelector(element),
          originalColor: color,
        };

        colorAndLocationMap.get(color)?.push(elementInfo);
      }
    }
  }

  return Array.from(colorAndLocationMap.entries()).map(([color, elements]) => ({
    color,
    elements,
  }));
};
