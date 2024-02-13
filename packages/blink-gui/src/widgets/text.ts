import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";

interface TextWidget {
  type: "text";
  element: HTMLElement;
  text: string;
}

export function defineText(context: Context) {
  return defineWidget("text", context, createText, diffText);
}

function createText(text: string): TextWidget {
  const element = document.createElement("div");
  element.textContent = text;
  return { type: "text", text, element };
}

function diffText(node: TextWidget, text: string): void {
  if (node.text !== text) {
    node.text = text;
    node.element.textContent = text;
  }
}
