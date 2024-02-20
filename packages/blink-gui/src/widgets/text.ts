import { createElement } from "../utils/createElement.js";
import { widget } from "../widget.js";

interface TextWidget {
  type: "text";
  element: HTMLElement;
  text: string;
}

export const text = widget("text", createText, diffText);

function createText(text: string): TextWidget {
  const element = createElement("div", {
    className: "BlinkText",
    textContent: text,
  });
  return { type: "text", text, element };
}

function diffText(node: TextWidget, text: string): void {
  if (node.text !== text) {
    node.text = text;
    node.element.textContent = text;
  }
}
