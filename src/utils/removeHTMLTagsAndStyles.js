export const removeHTMLTagsAndStyles = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const textWithStyles = Array.from(doc.body.childNodes)
      .map((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const styles = Array.from(node.style)
            .map((prop) => `${prop}: ${node.style[prop]}`)
            .join("; ");
          return `<span style="${styles}">${node.textContent}</span>`;
        }
        return "";
      })
      .join("");
    return textWithStyles;
  };