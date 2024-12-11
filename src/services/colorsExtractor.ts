function extractColors() {
  const colorSet = new Set();
  const colorAndLocationSet = new Set();
  let color;
  const relevantProperties = [
    "color",
    "background-color",
    "border-color",
    "outline-color",
    "text-decoration-color",
  ];
  const excludedElements = "script, link, meta, title, noscript, template, head, style";
  const allElements = document.querySelectorAll(`*:not(${excludedElements})`);

  for (const element of allElements) {
    const styles = window.getComputedStyle(element);

    for (const prop of relevantProperties) {
      color = styles.getPropertyValue(prop);

      if (
        color &&
        color !== "transparent" &&
        color !== "rgba(0, 0, 0, 1)" &&
        color !== "rgba(0, 0, 0, 0.8)" &&
        color !== "rgba(0, 0, 0, 0)" &&
        color !== "rgba(255, 255, 255, 1)" &&
        color !== "rgb(255, 255, 255)" &&
        color !== "rgb(0, 0, 0)"
      ) {
        colorSet.add(color);
      }
      if (color === "rgb(37, 99, 235)") {
        console.log("color", color);
        console.log(element);

        element.style.backgroundColor = "red";
        element.style.color = "green";

        const svgElement = element.querySelector("svg");
        if (svgElement) {
          console.log("SVG Element:", svgElement);

          const strokeValue = svgElement.getAttribute("stroke");
          console.log("Current:", strokeValue);

          svgElement.setAttribute("stroke", "white");
        }
      }
    }
    if (colorSet.has(color)) {
      colorAndLocationSet.add({ color: color, location: element });
    }
  }
  console.log("colorSet", colorAndLocationSet);
  console.log(Array.from(colorAndLocationSet));

  return Array.from(colorAndLocationSet);
}

// declare global {
//   interface Window {
//     extractColors: () => string[];
//   }
// }

window.extractColors = extractColors;
console.log("extractColors", window);

extractColors();
