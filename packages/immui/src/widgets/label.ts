import type { LabelNode } from "../Widget.js";
import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";

export function defineLabel(context: Context) {
  return defineWidget("label", context, createLabel, diffLabel);
}

function createLabel(text: string): LabelNode {
  const element = document.createElement("div");
  element.textContent = text;
  return { type: "label", text, element };
}

function diffLabel(node: LabelNode, text: string): void {
  if (node.text !== text) {
    node.text = text;
    node.element.textContent = text;
  }
}
