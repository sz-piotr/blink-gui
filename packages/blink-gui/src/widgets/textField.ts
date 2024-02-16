import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";
import { randomId } from "../utils/randomId.js";

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
  const value = options?.initialValue ?? options?.value ?? "";

  const id = randomId();
  const element = document.createElement("label");
  element.className = "BlinkField";
  element.setAttribute("for", id);

  const label = document.createElement("span");
  label.className = "BlinkLabel";
  label.textContent = text;
  element.appendChild(label);

  const input = document.createElement("input");
  input.id = id;
  input.className = "BlinkTextInput";
  input.value = value;
  element.appendChild(input);

  const node: TextFieldWidget = {
    type: "TextField",
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
