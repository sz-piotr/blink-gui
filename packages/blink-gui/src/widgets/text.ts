import { createElement } from "../utils/createElement.js";
import { defineWidget, type Context } from "../utils/defineWidget.js";

interface TextWidget {
  type: "text";
  element: HTMLElement;
  text: string;
}

export function defineText(context: Context) {
  return defineWidget("text", context, createText, diffText);
}

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
