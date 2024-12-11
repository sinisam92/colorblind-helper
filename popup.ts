document.getElementById("extractColors").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["./src/services/colorsExtractor.ts"],
    });
  });

  // chrome.storage.local.get("colors", (result) => {
  //   const colors = result.colors || [];
  //   const colorList = document.getElementById("colorList");
  //   colorList.innerHTML = "";

  //   colors.forEach((color) => {
  //     if (color !== "rgba(0, 0, 0, 0)") {
  //       const listItem = document.createElement("li");
  //       listItem.textContent = color;
  //       listItem.style.backgroundColor = color;
  //       colorList.appendChild(listItem);
  //     }
  //   });
  // });
});
