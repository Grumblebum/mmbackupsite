import ClipboardJS from "clipboard";

export const CopyURL = async (url, secureCode, urlType) => {
  return new Promise((resolve, reject) => {
    try {
      let isSuccess = false;
      const textToCopy =
        urlType === "Secure" && url
          ? `${url}\n\nSecurity Code: ${secureCode}`
          : url;
      if (textToCopy) {
        const tempButton = document.createElement("button");
        tempButton.setAttribute("data-clipboard-text", textToCopy);
        const clipboard = new ClipboardJS(tempButton);

        clipboard.on("success", () => {
          console.log("Text copied to clipboard successfully!");
          isSuccess = true;
          clipboard.destroy();
          tempButton.remove();
          resolve(isSuccess);
        });

        clipboard.on("error", () => {
          console.error("Failed to copy text.");
          isSuccess = false;
          clipboard.destroy();
          tempButton.remove();
          reject(isSuccess);
        });

        tempButton.click();
      } else {
        reject(false);
      }
    } catch (error) {
      console.error(error);
      reject(false);
    }
  });
};
