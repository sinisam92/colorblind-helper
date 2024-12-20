interface ElementInfo {
  tagName: string;
  className: string;
  id: string;
}

interface ColorInfo {
  color: string;
  elements: ElementInfo[];
}

export const extractColors = (): ColorInfo[] => {
  const colorSet = new Set<string>();
  const colorAndLocationMap = new Map<string, ElementInfo[]>();
  const excludedColors = new Set([
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
  const excludedElements = "script, link, meta, title, noscript, template, head, style";
  const allElements = document.querySelectorAll(`*:not(${excludedElements})`);

  const isExcludedColor = (color: string): boolean => {
    return excludedColors.has(color);
  };

  for (const element of allElements) {
    const styles = window.getComputedStyle(element);

    for (const prop of relevantProperties) {
      const color = styles.getPropertyValue(prop);

      if (color && !isExcludedColor(color)) {
        colorSet.add(color);

        if (!colorAndLocationMap.has(color)) {
          colorAndLocationMap.set(color, []);
        }
        const elementInfo: ElementInfo = {
          tagName: element.tagName.toLowerCase(),
          className: element instanceof HTMLElement ? element.className : "",
          id: element.id,
        };

        colorAndLocationMap.get(color)?.push(elementInfo);
      }
    }
  }
  console.log(
    Array.from(colorAndLocationMap.entries()).map(([color, elements]) => ({
      color,
      elements,
    }))
  );

  return Array.from(colorAndLocationMap.entries()).map(([color, elements]) => ({
    color,
    elements,
  }));
};
