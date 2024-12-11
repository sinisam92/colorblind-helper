chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "colorsExtracted") {
    console.log("Extracted colors:", message.colors);

    chrome.storage.local.set({ colors: message.colors });
  }
});
