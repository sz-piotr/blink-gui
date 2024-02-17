import { createElement } from "./createElement.js";
import { randomId } from "./randomId.js";

export function createField(tagName: "label" | "div", text?: string) {
  const id = randomId();

  const element = createElement(tagName, {
    className: "BlinkField",
    htmlFor: tagName === "label" ? id : undefined,
  });

  const label = createElement("span", {
    className: "BlinkLabel",
    textContent: text,
  });
  element.appendChild(label);

  if (!text) {
    label.style.display = "none";
  }

  return { element, id, label };
}
