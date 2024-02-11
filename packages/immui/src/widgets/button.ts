import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";

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
  const element = document.createElement("button");
  element.textContent = text;
  const node: ButtonWidget = { type: "button", text, clicked: false, element };
  element.addEventListener("click", () => {
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
