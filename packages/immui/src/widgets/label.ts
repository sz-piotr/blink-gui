import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";

interface LabelWidget {
  type: "label";
  element: HTMLElement;
  text: string;
}

export function defineLabel(context: Context) {
  return defineWidget("label", context, createLabel, diffLabel);
}

function createLabel(text: string): LabelWidget {
  const element = document.createElement("div");
  element.textContent = text;
  return { type: "label", text, element };
}

function diffLabel(node: LabelWidget, text: string): void {
  if (node.text !== text) {
    node.text = text;
    node.element.textContent = text;
  }
}
