interface ElementInfo {
  tagName: string;
  className: string;
  id: string;
}

interface ColorInfo {
  color: string;
  elements: ElementInfo[];
}

export function extractColors(): ColorInfo[] {
  console.log("Extracting Colors...");

  const colorSet = new Set<string>();
  const colorAndLocationMap = new Map<string, ElementInfo[]>();
  const excludedColors = new Set([
    "transparent",
    "rgba(0, 0, 0, 1)",
    "rgba(0, 0, 0, 0.8)",
    "rgba(0, 0, 0, 0)",
    "rgba(255, 255, 255, 1)",
    "rgb(255, 255, 255)",
    "rgb(0, 0, 0)",
  ]);
  const relevantProperties = [
    "color",
    "background-color",
    "border-color",
    "outline-color",
    "text-decoration-color",
  ];
  const excludedElements = "script, link, meta, title, noscript, template, head, style";
  const allElements = document.querySelectorAll(`*:not(${excludedElements})`);

  function isExcludedColor(color: string): boolean {
    return excludedColors.has(color);
  }

  for (const element of allElements) {
    const styles = window.getComputedStyle(element);

    for (const prop of relevantProperties) {
      const color = styles.getPropertyValue(prop);

      if (color && !isExcludedColor(color)) {
        colorSet.add(color);

        if (element instanceof HTMLElement) {
          if (color === "rgb(37, 99, 235)") {
            console.log("Matched Color:", color, "in Element:", element);
            element.style.backgroundColor = "red";
            element.style.color = "green";

            const svgElement = element.querySelector("svg");
            if (svgElement instanceof SVGElement) {
              const strokeValue = svgElement.getAttribute("stroke");
              console.log("SVG Element:", svgElement, "Current Stroke:", strokeValue);
              if (strokeValue) svgElement.setAttribute("stroke", "white");
            }
          }
        }

        // Add color and element to the map
        if (!colorAndLocationMap.has(color)) {
          colorAndLocationMap.set(color, []);
        }
        const elementInfo: ElementInfo = {
          tagName: element.tagName,
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
}

// // Assign function to `window`
// window.extractColors = extractColors;

// // Usage Example
// console.log("Extracted Colors:", extractColors());

// export function extractColors() {
//   console.log("Extracting Colors...");

//   const colorSet = new Set<string>();
//   const relevantProperties = ["color", "background-color", "border-color"];
//   const excludedElements = "script, link, meta, title, noscript, template, head, style";

//   const elements = document.querySelectorAll(`*:not(${excludedElements})`);
//   elements.forEach((element) => {
//     const styles = window.getComputedStyle(element);
//     relevantProperties.forEach((prop) => {
//       const color = styles.getPropertyValue(prop);
//       if (color && !colorSet.has(color)) {
//         colorSet.add(color);
//       }
//     });
//   });

//   return Array.from(colorSet);
// }
