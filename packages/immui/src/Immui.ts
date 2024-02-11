import type { Context, Widget } from "./defineWidget.js";
import { defineButton } from "./widgets/button.js";
import { defineCheckbox } from "./widgets/checkbox.js";
import { defineContainer } from "./widgets/container.js";
import { defineLabel } from "./widgets/label.js";

export interface ImmuiOptions {
  container?: HTMLElement;
  autoEnd?: boolean;
}

export class Immui {
  private element: HTMLElement;
  private nodes: Widget[] = [];
  private index = 0;
  private timeout?: ReturnType<typeof setTimeout>;
  private autoEnd: boolean;

  private context: Context = {
    getNextWidget: this.getNode.bind(this),
    replaceWidget: this.replaceNode.bind(this),
  };

  constructor(options?: ImmuiOptions) {
    this.element = options?.container ?? createContainerElement();
    this.autoEnd = options?.autoEnd ?? true;
  }

  label = defineLabel(this.context);
  button = defineButton(this.context);
  checkbox = defineCheckbox(this.context);
  container = defineContainer(this.context);

  control<T>(object: T, key: keyof T & string): void {
    const value = object[key];
    if (typeof value === "boolean") {
      const newValue = this.checkbox(key, { value });
      if (newValue !== value) {
        // @ts-expect-error - We know this is a boolean
        object[key] = newValue;
      }
    } else {
      throw new Error("Not implemented");
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
  container.classList.add("immui-container");
  document.body.appendChild(container);
  return container;
}
