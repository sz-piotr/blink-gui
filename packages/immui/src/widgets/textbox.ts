import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";

interface TextboxWidget {
  type: "textbox";
  element: HTMLElement;
  input: HTMLInputElement;
  label: HTMLSpanElement;
  text: string;
  value: string;
  updated: boolean;
}

export interface TextboxOptions {
  value?: string;
  initialValue?: string;
}

export function defineTextbox(context: Context) {
  return defineWidget("textbox", context, createTextbox, diffTextbox);
}

function createTextbox(text: string, options?: TextboxOptions): TextboxWidget {
  const value = options?.initialValue ?? options?.value ?? "";
  const element = document.createElement("label");
  element.style.display = "block";

  const label = document.createElement("span");
  label.textContent = text;
  element.appendChild(label);

  const input = document.createElement("input");
  input.value = value;
  element.appendChild(input);

  const node: TextboxWidget = {
    type: "textbox",
    element,
    input,
    label,
    text,
    value,
    updated: false,
  };
  input.addEventListener("input", () => {
    node.value = input.value;
    node.updated = true;
  });
  return node;
}

function diffTextbox(
  node: TextboxWidget,
  text: string,
  options?: TextboxOptions,
): string {
  if (node.text !== text) {
    node.text = text;
    node.label.textContent = text;
  }
  if (
    !node.updated &&
    options?.value !== undefined &&
    options.value !== node.value
  ) {
    node.value = options.value;
    node.input.value = options.value;
  }
  node.updated = false;
  return node.value;
}
