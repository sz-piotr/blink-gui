import { createElement } from "../utils/createElement.js";
import { defineWidget, type Context } from "../utils/defineWidget.js";

interface ButtonWidget {
  type: "button";
  element: HTMLElement;
  text: string;
  clicked: boolean;
}

export function defineButton(context: Context) {
  return defineWidget("button", context, createButton, diffButton);
}

function createButton(text: string): ButtonWidget {
  const element = createElement("div");
  const button = createElement("button", { textContent: text });
  element.appendChild(button);

  const node: ButtonWidget = { type: "button", text, clicked: false, element };
  button.addEventListener("click", () => {
    node.clicked = true;
  });
  return node;
}

function diffButton(node: ButtonWidget, text: string): boolean {
  if (node.text !== text) {
    node.text = text;
    node.element.textContent = text;
  }
  if (node.clicked) {
    node.clicked = false;
    return true;
  }
  return false;
}
