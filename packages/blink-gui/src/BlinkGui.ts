import type { Context, Widget } from "./defineWidget.js";
import { injectStyles } from "./injectStyles.js";
import { toTitleCase } from "./utils/toTitleCase.js";
import { defineButton } from "./widgets/button.js";
import { defineCheckboxField } from "./widgets/checkboxField.js";
import { defineContainer } from "./widgets/container.js";
import { defineNumberField } from "./widgets/numberField.js";
import { defineText } from "./widgets/text.js";
import { defineTextField } from "./widgets/textField.js";

export interface BlinkGuiOptions {
  container?: HTMLElement;
  autoEnd?: boolean;
  skipInjectingStyles?: boolean;
}

export class BlinkGui {
  private element: HTMLElement;
  private nodes: Widget[] = [];
  private index = 0;
  private timeout?: ReturnType<typeof setTimeout>;
  private autoEnd: boolean;

  private context: Context = {
    getNextWidget: this.getNode.bind(this),
    replaceWidget: this.replaceNode.bind(this),
  };

  constructor(options?: BlinkGuiOptions) {
    this.element = options?.container ?? createContainerElement();
    this.autoEnd = options?.autoEnd ?? true;
    if (!options?.skipInjectingStyles) {
      injectStyles();
    }
  }

  container = defineContainer(this.context);

  text = defineText(this.context);
  button = defineButton(this.context);

  checkboxField = defineCheckboxField(this.context);
  checkboxControl<K extends string>(
    object: { [_ in K]: boolean },
    key: K,
  ): void {
    const value = object[key];
    const newValue = this.checkboxField(toTitleCase(key), { value });
    if (newValue !== value) {
      object[key] = newValue;
    }
  }

  textField = defineTextField(this.context);
  textControl<K extends string>(object: { [_ in K]: string }, key: K): void {
    const value = object[key];
    const newValue = this.textField(toTitleCase(key), { value });
    if (newValue !== value) {
      object[key] = newValue;
    }
  }

  numberField = defineNumberField(this.context);
  numberControl<K extends string>(object: { [_ in K]: number }, key: K): void {
    const value = object[key];
    const newValue = this.numberField(toTitleCase(key), { value });
    if (newValue !== value) {
      object[key] = newValue;
    }
  }

  control<K extends string>(
    object: { [_ in K]: boolean | string | number },
    key: K,
  ): void {
    const value = object[key];
    if (typeof value === "boolean") {
      return this.checkboxControl(object as { [_ in K]: boolean }, key);
    } else if (typeof value === "string") {
      return this.textControl(object as { [_ in K]: string }, key);
    } else if (typeof value === "number") {
      return this.numberControl(object as { [_ in K]: number }, key);
    } else {
      throw new Error("Invalid value type");
    }
  }

  controlSet(object: {}): void {
    for (const key in object) {
      const type = typeof (object as Record<string, unknown>)[key];
      if (type === "boolean" || type === "string" || type === "number") {
        this.control(object, key as string);
      }
    }
  }

  private getNode() {
    if (this.autoEnd && this.timeout === undefined) {
      this.timeout = setTimeout(() => this.end(), 0);
    }
    return this.nodes[this.index++];
  }

  private replaceNode(node: Widget) {
    const oldNode = this.nodes[this.index];
    if (oldNode) {
      this.element.replaceChild(node.element, oldNode.element);
      this.nodes[this.index] = node;
    } else {
      this.element.appendChild(node.element);
      this.nodes.push(node);
    }
  }

  end() {
    if (this.timeout !== undefined) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }

    const removed = this.nodes.splice(this.index);
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
