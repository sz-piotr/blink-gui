import type { ButtonNode } from "../Widget.js";
import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";

export function defineButton(context: Context) {
  return defineWidget("button", context, createButton, diffButton);
}

function createButton(text: string): ButtonNode {
  const element = document.createElement("button");
  element.textContent = text;
  const node: ButtonNode = { type: "button", text, clicked: false, element };
  element.addEventListener("click", () => {
    node.clicked = true;
  });
  return node;
}

function diffButton(node: ButtonNode, text: string): boolean {
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
