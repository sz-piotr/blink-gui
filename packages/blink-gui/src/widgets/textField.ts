import { createElement } from "../utils/createElement.js";
import { createField } from "../utils/createField.js";
import { diffLabel } from "../utils/diffLabel.js";
import { widget } from "../widget.js";

interface TextFieldWidget {
  type: "textField";
  element: HTMLElement;
  label: HTMLSpanElement;
  labelText: string;
  input: HTMLInputElement;
  inputValue: string;
  updated: boolean;
}

export interface TextFieldOptions {
  value?: string;
  initialValue?: string;
}

export const textField = widget("textField", createTextField, diffTextField);

function createTextField(
  label: string,
  options?: TextFieldOptions,
): TextFieldWidget {
  const field = createField("label", label);

  const inputValue = options?.initialValue ?? options?.value ?? "";

  const input = createElement("input", {
    id: field.id,
    className: "BlinkTextInput",
    value: inputValue,
  });
  field.element.appendChild(input);

  const node: TextFieldWidget = {
    type: "textField",
    element: field.element,
    label: field.label,
    labelText: label,
    input,
    inputValue,
    updated: false,
  };
  input.addEventListener("input", () => {
    node.inputValue = input.value;
    node.updated = true;
  });
  return node;
}

function diffTextField(
  node: TextFieldWidget,
  label: string,
  options?: TextFieldOptions,
): string {
  diffLabel(node, label);

  if (
    !node.updated &&
    options?.value !== undefined &&
    options.value !== node.inputValue
  ) {
    node.inputValue = options.value;
    node.input.value = options.value;
  }
  node.updated = false;

  return node.inputValue;
}
