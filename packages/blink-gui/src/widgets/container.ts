import { BlinkGui } from "../BlinkGui.js";
import { createElement } from "../utils/createElement.js";
import { defineWidget, type Context } from "../utils/defineWidget.js";

interface ContainerWidget {
  type: "container";
  element: HTMLElement;
  ui: BlinkGui;
}

export function defineContainer(context: Context) {
  return defineWidget("container", context, createContainer, diffContainer);
}

function createContainer(contents: (ui: BlinkGui) => void): ContainerWidget {
  const element = createElement("div");
  const ui = new BlinkGui({
    container: element,
    autoEnd: false,
    skipInjectingStyles: true,
  });
  contents(ui);
  ui.end();
  return { type: "container", element, ui };
}

function diffContainer(
  node: ContainerWidget,
  contents: (ui: BlinkGui) => void,
): void {
  contents(node.ui);
  node.ui.end();
}
