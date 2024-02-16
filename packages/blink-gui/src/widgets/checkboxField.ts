import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";
import { randomId } from "../utils/randomId.js";

interface CheckboxFieldWidget {
  type: "CheckboxField";
  element: HTMLElement;
  input: HTMLInputElement;
  label: HTMLSpanElement;
  text: string;
  value: boolean;
  updated: boolean;
}

export interface CheckboxFieldOptions {
  value?: boolean;
  initialValue?: boolean;
}

export function defineCheckboxField(context: Context) {
  return defineWidget(
    "CheckboxField",
    context,
    createCheckboxField,
    diffCheckboxField,
  );
}

function createCheckboxField(
  text: string,
  options?: CheckboxFieldOptions,
): CheckboxFieldWidget {
  const value = options?.initialValue ?? options?.value ?? false;

  const id = randomId();
  const element = document.createElement("label");
  element.className = "BlinkField";
  element.setAttribute("for", id);

  const label = document.createElement("span");
  label.className = "BlinkLabel";
  label.textContent = text;
  element.appendChild(label);

  const wrapper = document.createElement("div");
  wrapper.className = "BlinkCheckbox";
  element.appendChild(wrapper);

  const input = document.createElement("input");
  input.id = id;
  input.type = "checkbox";
  input.checked = value;
  wrapper.appendChild(input);

  const xmlns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(xmlns, "svg");
  svg.setAttributeNS(null, "viewBox", "0 0 20 20");
  svg.setAttributeNS(null, "width", "20px");
  svg.setAttributeNS(null, "height", "20px");
  const path = document.createElementNS(xmlns, "path");
  path.setAttributeNS(null, "d", "M4 10l4 4 8-8");
  svg.appendChild(path);
  wrapper.appendChild(svg);

  const node: CheckboxFieldWidget = {
    type: "CheckboxField",
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

function diffCheckboxField(
  node: CheckboxFieldWidget,
  text: string,
  options?: CheckboxFieldOptions,
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
