import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";
import { randomId } from "../utils/randomId.js";

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
  const value = options?.initialValue ?? options?.value ?? 0;

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
  input.className = "BlinkNumberInput";
  input.value = value.toString();
  element.appendChild(input);

  const node: NumberFieldWidget = {
    type: "NumberField",
    element,
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
