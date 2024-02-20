import { injectStyles } from "./injectStyles.js";
import type { Widget } from "./widget.js";
import { button } from "./widgets/button.js";
import { checkboxControl } from "./widgets/checkboxControl.js";
import { checkboxField } from "./widgets/checkboxField.js";
import { control } from "./widgets/control.js";
import { controlSet } from "./widgets/controlSet.js";
import { numberControl } from "./widgets/numberControl.js";
import { numberField } from "./widgets/numberField.js";
import { text } from "./widgets/text.js";
import { textControl } from "./widgets/textControl.js";
import { textField } from "./widgets/textField.js";
import { vectorControl } from "./widgets/vectorControl.js";

export interface BlinkGuiOptions {
  container?: HTMLElement;
  autoEnd?: boolean;
  skipInjectingStyles?: boolean;
}

export class BlinkGui {
  private element: HTMLElement;
  private widgets: Widget[] = [];
  private index = 0;
  private timeout?: ReturnType<typeof setTimeout>;
  private autoEnd: boolean;

  constructor(options?: BlinkGuiOptions) {
    this.element = options?.container ?? createContainerElement();
    this.autoEnd = options?.autoEnd ?? true;
    if (!options?.skipInjectingStyles) {
      injectStyles();
    }
  }

  text = text;
  button = button;
  checkboxField = checkboxField;
  checkboxControl = checkboxControl;
  textField = textField;
  textControl = textControl;
  numberField = numberField;
  numberControl = numberControl;
  vectorControl = vectorControl;
  control = control;
  controlSet = controlSet;

  protected getNextWidget() {
    if (this.autoEnd && this.timeout === undefined) {
      this.timeout = setTimeout(() => this.end(), 0);
    }
    return this.widgets[this.index++];
  }

  protected replaceWidget(node: Widget) {
    const oldNode = this.widgets[this.index];
    if (oldNode) {
      this.element.replaceChild(node.element, oldNode.element);
      this.widgets[this.index] = node;
    } else {
      this.element.appendChild(node.element);
      this.widgets.push(node);
    }
  }

  end() {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    const removed = this.widgets.splice(this.index);
    for (const node of removed) {
      this.element.removeChild(node.element);
    }
    this.index = 0;
  }
}

function createContainerElement() {
  const container = document.createElement("div");
  container.classList.add("BlinkGui");
  document.body.appendChild(container);
  return container;
}
