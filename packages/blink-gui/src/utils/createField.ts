import { createElement } from "./createElement.js";
import { randomId } from "./randomId.js";

export function createField(element: "label" | "div", text: string) {
  const id = randomId();

  const field = createElement(element, {
    className: "BlinkField",
    htmlFor: element === "label" ? id : undefined,
  });

  const label = createElement("span", {
    className: "BlinkLabel",
    textContent: text,
  });
  field.appendChild(label);

  return { field, id, label };
}
