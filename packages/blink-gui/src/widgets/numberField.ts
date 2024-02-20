import { createElement } from "../utils/createElement.js";
import { createField } from "../utils/createField.js";
import { diffLabel } from "../utils/diffLabel.js";
import { widget } from "../widget.js";

interface NumberFieldWidget {
  type: "numberField";
  element: HTMLElement;
  label: HTMLSpanElement;
  labelText: string;
  input: HTMLInputElement;
  inputValue: number;
  updated: boolean;
}

export interface NumberFieldOptions {
  value?: number;
  initialValue?: number;
}

export const numberField = widget(
  "numberField",
  createNumberField,
  diffNumberField,
);

function createNumberField(
  label: string,
  options?: NumberFieldOptions,
): NumberFieldWidget {
  const field = createField("label", label);

  const value = options?.initialValue ?? options?.value ?? 0;

  const input = createElement("input", {
    id: field.id,
    className: "BlinkNumberInput",
    value: value.toString(),
  });
  field.element.appendChild(input);

  const node: NumberFieldWidget = {
    type: "numberField",
    element: field.element,
    input,
    label: field.label,
    labelText: label,
    inputValue: value,
    updated: false,
  };
  input.addEventListener("input", () => {
    node.inputValue = parseFloat(input.value) || 0;
    input.value = node.inputValue.toString();
    node.updated = true;
  });
  return node;
}

function diffNumberField(
  node: NumberFieldWidget,
  label: string,
  options?: NumberFieldOptions,
): number {
  diffLabel(node, label);
  if (
    !node.updated &&
    options?.value !== undefined &&
    options.value !== node.inputValue
  ) {
    node.inputValue = options.value;
    node.input.value = options.value.toString();
  }
  node.updated = false;
  return node.inputValue;
}
