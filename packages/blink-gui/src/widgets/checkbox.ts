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
  element.className = "blnk-field";

  const label = document.createElement("span");
  label.className = "blnk-label";
  label.textContent = text;
  element.appendChild(label);

  const wrapper = document.createElement("div");
  wrapper.className = "blnk-checkbox";
  element.appendChild(wrapper);

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = value;
  wrapper.appendChild(input);

  const xmlns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(xmlns, "svg");
  svg.setAttributeNS(null, "viewBox", "0 0 16 16");
  svg.setAttributeNS(null, "width", "16px");
  svg.setAttributeNS(null, "height", "16px");
  const path = document.createElementNS(xmlns, "path");
  path.setAttributeNS(null, "d", "M4 8l3 3 6-6");
  svg.appendChild(path);
  wrapper.appendChild(svg);

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
