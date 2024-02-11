import { add } from "./add.js";

export const THREE = add(1, 2);

export interface ImmuiOptions {
  container?: HTMLElement;
  autoEnd?: boolean;
}

type UiNode = LabelNode | ButtonNode | ContainerNode;

interface LabelNode {
  type: "label";
  text: string;
  element: HTMLElement;
}

interface ButtonNode {
  type: "button";
  text: string;
  clicked: boolean;
  element: HTMLButtonElement;
}

interface ContainerNode {
  type: "container";
  element: HTMLElement;
  ui: Immui;
}

export class Immui {
  private element: HTMLElement;
  private nodes: UiNode[] = [];
  private index = 0;
  private timeout?: ReturnType<typeof setTimeout>;
  private autoEnd: boolean;

  constructor(options?: ImmuiOptions) {
    this.element = options?.container ?? createContainerElement();
    this.autoEnd = options?.autoEnd ?? true;
  }

  label(text: string): void {
    this.scheduleEnd();
    const node = this.nodes[this.index];
    if (node?.type !== "label") {
      this.replaceNode(createLabel(text));
    } else {
      if (node.text !== text) {
        node.text = text;
        node.element.textContent = text;
      }
    }
    this.index++;
  }

  button(text: string): boolean {
    this.scheduleEnd();
    let clicked = false;
    const node = this.nodes[this.index];
    if (node?.type !== "button") {
      this.replaceNode(createButton(text));
    } else {
      if (node.text !== text) {
        node.text = text;
        node.element.textContent = text;
      }
      if (node.clicked) {
        node.clicked = false;
        clicked = true;
      }
    }
    this.index++;
    return clicked;
  }

  container(ui: (ui: Immui) => void): void {
    this.scheduleEnd();
    const node = this.nodes[this.index];
    if (node?.type !== "container") {
      const node = createContainer();
      ui(node.ui);
      node.ui.end();
      this.replaceNode(node);
    } else {
      ui(node.ui);
      node.ui.end();
    }
    this.index++;
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

  private scheduleEnd() {
    if (this.autoEnd && this.timeout === undefined) {
      this.timeout = setTimeout(() => this.end(), 0);
    }
  }

  private replaceNode(node: UiNode) {
    const oldNode = this.nodes[this.index];
    if (oldNode) {
      this.element.replaceChild(node.element, oldNode.element);
      this.nodes[this.index] = node;
    } else {
      this.element.appendChild(node.element);
      this.nodes.push(node);
    }
  }
}

function createLabel(text: string): LabelNode {
  const element = document.createElement("div");
  element.textContent = text;
  return { type: "label", text, element };
}

function createButton(text: string): ButtonNode {
  const element = document.createElement("button");
  element.textContent = text;
  const node: ButtonNode = { type: "button", text, clicked: false, element };
  element.addEventListener("click", () => {
    node.clicked = true;
  });
  return node;
}

function createContainer(): ContainerNode {
  const element = document.createElement("div");
  const ui = new Immui({ container: element, autoEnd: false });
  return { type: "container", element, ui };
}

function createContainerElement() {
  const container = document.createElement("div");
  container.classList.add("immui-container");
  document.body.appendChild(container);
  return container;
}
