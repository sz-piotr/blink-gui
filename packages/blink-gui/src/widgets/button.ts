import { createElement } from "../utils/createElement.js";
import { createField } from "../utils/createField.js";
import { diffLabel } from "../utils/diffLabel.js";
import { widget } from "../widget.js";

interface ButtonWidget {
  type: "button";
  element: HTMLElement;
  label: HTMLSpanElement;
  labelText: string;
  button: HTMLButtonElement;
  buttonText: string;
  clicked: boolean;
}

export interface ButtonOptions {
  label: string;
}

export const button = widget("button", createButton, diffButton);

function createButton(text: string, options?: ButtonOptions): ButtonWidget {
  const { element, label } = createField("div", options?.label ?? "");

  const button = createElement("button", {
    className: "BlinkButton",
    textContent: text,
  });
  element.appendChild(button);

  const node: ButtonWidget = {
    type: "button",
    element,
    label,
    labelText: options?.label ?? "",
    button,
    buttonText: text,
    clicked: false,
  };
  button.addEventListener("click", () => {
    node.clicked = true;
  });
  return node;
}

function diffButton(
  node: ButtonWidget,
  text: string,
  options?: ButtonOptions,
): boolean {
  diffLabel(node, options?.label);

  if (node.buttonText !== text) {
    node.buttonText = text;
    node.button.textContent = text;
  }

  if (node.clicked) {
    node.clicked = false;
    return true;
  }
  return false;
}
