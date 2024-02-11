import { Immui } from "../Immui.js";
import type { Context } from "../defineWidget.js";
import { defineWidget } from "../defineWidget.js";

interface ContainerWidget {
  type: "container";
  element: HTMLElement;
  ui: Immui;
}

export function defineContainer(context: Context) {
  return defineWidget("container", context, createContainer, diffContainer);
}

function createContainer(contents: (ui: Immui) => void): ContainerWidget {
  const element = document.createElement("div");
  const ui = new Immui({ container: element, autoEnd: false });
  contents(ui);
  ui.end();
  return { type: "container", element, ui };
}

function diffContainer(
  node: ContainerWidget,
  contents: (ui: Immui) => void,
): void {
  contents(node.ui);
  node.ui.end();
}
