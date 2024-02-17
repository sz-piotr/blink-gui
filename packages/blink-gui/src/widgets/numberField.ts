import { createElement } from "../utils/createElement.js";
import { createField } from "../utils/createField.js";
import { defineWidget, type Context } from "../utils/defineWidget.js";

interface NumberFieldWidget {
  type: "NumberField";
  element: HTMLElement;
  input: HTMLInputElement;
  label: HTMLSpanElement;
  text: string;
  value: number;
  updated: boolean;
}

export interface NumberFieldOptions {
  value?: number;
  initialValue?: number;
}

export function defineNumberField(context: Context) {
  return defineWidget(
    "NumberField",
    context,
    createNumberField,
    diffNumberField,
  );
}

function createNumberField(
  text: string,
  options?: NumberFieldOptions,
): NumberFieldWidget {
  const { id, field, label } = createField("label", text);

  const value = options?.initialValue ?? options?.value ?? 0;

  const input = createElement("input", {
    id,
    className: "BlinkNumberInput",
    value: value.toString(),
  });
  field.appendChild(input);

  const node: NumberFieldWidget = {
    type: "NumberField",
    element: field,
    input,
    label,
    text,
    value,
    updated: false,
  };
  input.addEventListener("input", () => {
    node.value = parseFloat(input.value) || 0;
    input.value = node.value.toString();
    node.updated = true;
  });
  return node;
}

function diffNumberField(
  node: NumberFieldWidget,
  text: string,
  options?: NumberFieldOptions,
): number {
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
    node.input.value = options.value.toString();
  }
  node.updated = false;
  return node.value;
}
