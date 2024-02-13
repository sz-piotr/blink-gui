import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";

interface CheckboxWidget {
  type: "checkbox";
  element: HTMLElement;
  input: HTMLInputElement;
  label: HTMLSpanElement;
  text: string;
  value: boolean;
  updated: boolean;
}

export interface CheckboxOptions {
  value?: boolean;
  initialValue?: boolean;
}

export function defineCheckbox(context: Context) {
  return defineWidget("checkbox", context, createCheckbox, diffCheckbox);
}

function createCheckbox(
  text: string,
  options?: CheckboxOptions,
): CheckboxWidget {
  const value = options?.initialValue ?? options?.value ?? false;
  const element = document.createElement("label");
  element.style.display = "block";

  const label = document.createElement("span");
  label.textContent = text;
  element.appendChild(label);

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = value;
  element.appendChild(input);

  const node: CheckboxWidget = {
    type: "checkbox",
    element,
    input,
    label,
    text,
    value,
    updated: false,
  };
  input.addEventListener("change", () => {
    node.value = input.checked;
    node.updated = true;
  });
  return node;
}

function diffCheckbox(
  node: CheckboxWidget,
  text: string,
  options?: CheckboxOptions,
): boolean {
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
    node.input.checked = options.value;
  }
  node.updated = false;
  return node.value;
}
