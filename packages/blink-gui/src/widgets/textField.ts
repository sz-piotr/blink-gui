import { createElement } from "../utils/createElement.js";
import { createField } from "../utils/createField.js";
import { defineWidget, type Context } from "../utils/defineWidget.js";

interface TextFieldWidget {
  type: "TextField";
  element: HTMLElement;
  input: HTMLInputElement;
  label: HTMLSpanElement;
  text: string;
  value: string;
  updated: boolean;
}

export interface TextFieldOptions {
  value?: string;
  initialValue?: string;
}

export function defineTextField(context: Context) {
  return defineWidget("TextField", context, createTextField, diffTextField);
}

function createTextField(
  text: string,
  options?: TextFieldOptions,
): TextFieldWidget {
  const { id, field, label } = createField("label", text);

  const value = options?.initialValue ?? options?.value ?? "";

  const input = createElement("input", {
    id,
    className: "BlinkTextInput",
    value,
  });
  field.appendChild(input);

  const node: TextFieldWidget = {
    type: "TextField",
    element: field,
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

function diffTextField(
  node: TextFieldWidget,
  text: string,
  options?: TextFieldOptions,
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
