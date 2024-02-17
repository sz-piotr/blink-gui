import { createElement } from "../utils/createElement.js";
import { createField } from "../utils/createField.js";
import { defineWidget, type Context } from "../utils/defineWidget.js";
import { diffLabel } from "../utils/diffLabel.js";

interface CheckboxFieldWidget {
  type: "CheckboxField";
  element: HTMLElement;
  label: HTMLSpanElement;
  labelText: string;
  input: HTMLInputElement;
  inputValue: boolean;
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
  label: string,
  options?: CheckboxFieldOptions,
): CheckboxFieldWidget {
  const field = createField("label", label);

  const inputValue = options?.initialValue ?? options?.value ?? false;

  const wrapper = createElement("div", { className: "BlinkCheckbox" });
  field.element.appendChild(wrapper);

  const input = createElement("input", {
    id: field.id,
    type: "checkbox",
    checked: inputValue,
  });
  wrapper.appendChild(input);

  const svg = createCheckboxSvg();
  wrapper.appendChild(svg);

  const node: CheckboxFieldWidget = {
    type: "CheckboxField",
    element: field.element,
    input,
    label: field.label,
    labelText: label,
    inputValue,
    updated: false,
  };
  input.addEventListener("change", () => {
    node.inputValue = input.checked;
    node.updated = true;
  });
  return node;
}

function diffCheckboxField(
  node: CheckboxFieldWidget,
  label: string,
  options?: CheckboxFieldOptions,
): boolean {
  diffLabel(node, label);

  if (
    !node.updated &&
    options?.value !== undefined &&
    options.value !== node.inputValue
  ) {
    node.inputValue = options.value;
    node.input.checked = options.value;
  }
  node.updated = false;

  return node.inputValue;
}

function createCheckboxSvg() {
  const xmlns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(xmlns, "svg");
  svg.setAttributeNS(null, "viewBox", "0 0 20 20");
  svg.setAttributeNS(null, "width", "20px");
  svg.setAttributeNS(null, "height", "20px");
  const path = document.createElementNS(xmlns, "path");
  path.setAttributeNS(null, "d", "M4 10l4 4 8-8");
  svg.appendChild(path);
  return svg;
}
